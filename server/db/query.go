package db

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/iMeisa/errortrace"
	"github.com/iMeisa/iRacingStats/server/models"
	"github.com/lib/pq"
	"log"
	"slices"
	"time"
)

func fullTrackName(trackName, configName string) string {
	if configName == "" {
		return trackName
	}
	return trackName + " - " + configName
}

// stringToJsonMap unmarshals string JSON into a JsonMap
func stringToJsonMap(jsonString string) (JsonMap, errortrace.ErrorTrace) {
	var jsonMap JsonMap
	err := json.Unmarshal([]byte(jsonString), &jsonMap)
	if err != nil {
		return jsonMap, errortrace.NewTrace(err)
	}

	return jsonMap, errortrace.NilTrace()
}

func (d *DB) LatestSeriesSeason(seriesId int) (seasonId int) {
	ctx, cancel := getContext()
	defer cancel()

	row := d.SQL.QueryRowContext(ctx, `
		SELECT max(season_id)
		FROM sessions s 
		JOIN seasons se USING (season_id)
		WHERE series_id = $1
	`, seriesId)

	err := row.Scan(&seasonId)
	if err != nil {
		log.Println("error getting latest series season:", err)
		return 0
	}

	return seasonId
}

// LatestSeriesWeek returns iso_year and iso_week for latest session
func (d *DB) LatestSeriesWeek(seriesId int) (year int, week int) {
	ctx, cancel := getContext()
	defer cancel()

	seasonId := d.LatestSeriesSeason(seriesId)

	row := d.SQL.QueryRowContext(ctx, `
		SELECT iso_year, iso_week
		FROM sessions
		WHERE season_id = $1
		ORDER BY session_id DESC
	`, seasonId)

	err := row.Scan(&year, &week)
	if err != nil {
		log.Println("error scanning latest series week:", err)
	}

	return year, week
}

func (d *DB) LatestSubsessionTime() int {
	ctx, cancel := getContext()
	defer cancel()

	row := d.SQL.QueryRowContext(ctx, "SELECT max(end_time) FROM subsessions")

	var latestTime int
	err := row.Scan(&latestTime)
	if err != nil {
		return 0
	}

	return latestTime
}

// ContentCache queries cache and hash of tables
func (d *DB) ContentCache(contentName string) models.ContentCache {
	ctx, cancel := getContext()
	defer cancel()

	statement := `
		SELECT content_type, data, hash
		FROM content_cache
		WHERE content_type = $1
	`

	row := d.SQL.QueryRowContext(ctx, statement, contentName)

	var cache models.ContentCache
	err := row.Scan(&cache.ContentName, &cache.Data, &cache.Hash)
	if err != nil {
		log.Println("error scanning content_cache: ", err)
		return models.ContentCache{}
	}

	return cache
}

// CacheHashes return hashes of content cache
func (d *DB) CacheHashes() []models.ContentCache {
	ctx, cancel := getContext()
	defer cancel()

	statement := `
		SELECT content_type, hash
		FROM content_cache
	`

	rows, err := d.SQL.QueryContext(ctx, statement)
	if err != nil {
		log.Println("error querying hashes: ", err)
	}

	var hashes []models.ContentCache
	for rows.Next() {
		var cache models.ContentCache
		err = rows.Scan(&cache.ContentName, &cache.Hash)
		if err != nil {
			log.Println("error scanning content_cache hash: ", err)
		}

		hashes = append(hashes, cache)
	}

	return hashes
}

// currentSeriesSeasonIds returns IDs for currently active seasons
func (d *DB) currentSeriesSeasonIds() []int {
	ctx, cancel := getContext()
	defer cancel()

	statement := `
		SELECT max(season_id)
		FROM series s 
		JOIN seasons s2 USING (series_id)
		WHERE active 
		GROUP BY series_id
	`

	rows, err := d.SQL.QueryContext(ctx, statement)
	if err != nil {
		log.Println("error querying series season ids: ", err)
	}

	var seasonIds []int
	for rows.Next() {
		var seasonId int
		err = rows.Scan(&seasonId)
		if err != nil {
			log.Println("error scanning series season id: ", err)
			continue
		}

		seasonIds = append(seasonIds, seasonId)
	}

	//fmt.Println("idk", seasonIds)
	return seasonIds
}

// driverCache returns cached data for driver
// returns Result model slice, if cache needs to be updated, latest subsession, earliest subsession
func (d *DB) driverCache(custId int) ([]models.DriverRace, bool, int, int) {

	statement := `
		SELECT data,
			   latest_subsession,
			   earliest_subsession,
			   has_update
		FROM driver_results_cache
		WHERE cust_id = $1
	`

	row := d.SQL.QueryRow(statement, custId)

	var data []models.DriverRace
	var rawData []byte

	maxSubsession := 0
	minSubsession := 0
	hasUpdate := false
	err := row.Scan(&rawData, &maxSubsession, &minSubsession, &hasUpdate)
	if err != nil {
		log.Println("error scanning if user cache is updated: ", err)
		return nil, true, 0, 0
	}

	err = json.Unmarshal(rawData, &data)
	if err != nil {
		log.Println("error unmarshalling cached driver data: ", err)
		return nil, true, 0, 0
	}

	return data, hasUpdate, maxSubsession, minSubsession

}

func (d *DB) DataRange() map[string]int {
	dataRange := make(map[string]int)

	ctx, cancel := getContext()
	defer cancel()

	row := d.SQL.QueryRowContext(ctx, "SELECT MIN(end_time), MAX(end_time) FROM subsessions WHERE end_time > 0 LIMIT 1")

	var minTime int
	var maxTime int
	err := row.Scan(&minTime, &maxTime)
	if err != nil {
		log.Println("error retrieving subsession data range:", err)
	}

	dataRange["min"] = minTime
	dataRange["max"] = maxTime

	return dataRange
}

func (d *DB) DriverData(id int) models.DriverData {

	var driverData models.DriverData
	driverData.Races = d.DriverRaces(id)

	return driverData
}

func (d *DB) DriverRaces(id int) []models.DriverRace {

	results, hasUpdate, maxSubsession, minSubsession := d.driverCache(id)

	if hasUpdate {
		results = append(results, d.uncachedDriverRaces(id, maxSubsession, minSubsession)...)
	}

	go d.cacheDriverResults(results, id)

	return results
}

func (d *DB) DriverUpdate(id int) models.JsonResponse {

	statement := `
		SELECT has_update
		FROM driver_results_cache
		WHERE cust_id = $1
	`

	row := d.SQL.QueryRow(statement, id)

	var hasUpdate bool
	err := row.Scan(&hasUpdate)

	if err != nil {
		return models.JsonResponse{
			Ok:      false,
			BoolVal: false,
		}
	}

	return models.JsonResponse{
		Ok:      true,
		BoolVal: hasUpdate,
	}
}

func (d *DB) GetTrackConfigsFromId(trackId int) []int {
	ctx, cancel := getContext()
	defer cancel()

	packageId := d.GetTrackPackage(trackId)

	statement := `
		SELECT track_id
		FROM tracks
		WHERE package_id = $1
	`

	rows, err := d.SQL.QueryContext(ctx, statement, packageId)

	if err != nil {
		log.Println("error querying track configs: ", err)
		return []int(nil)
	}

	var configs []int
	for rows.Next() {
		var configId int
		err = rows.Scan(&configId)

		if err != nil {
			log.Println("error scanning track configs: ", err)
			continue
		}

		configs = append(configs, configId)
	}

	return configs
}

func (d *DB) GetTrackConfigsFromPackage(packageId int) {

}

func (d *DB) GetTrackPackage(trackId int) int {
	ctx, cancel := getContext()
	defer cancel()

	statement := `
		SELECT package_id
		FROM tracks
		WHERE track_id = $1
	`

	row := d.SQL.QueryRowContext(ctx, statement, trackId)

	var packageId int
	err := row.Scan(&packageId)
	if err != nil {
		log.Println("error scanning track package id: ", err)
		return 0
	}

	return packageId
}

// Query validates and executes api query requested by the user
func (d *DB) Query(tableName string, queries UrlQueryMap) ([]JsonMap, errortrace.ErrorTrace) {
	ctx, cancel := getContext()
	defer cancel()

	// Validate tableName
	if !d.validTable(tableName) {
		return nil, errortrace.NewTrace(errors.New(fmt.Sprintf("invalid table name: %s", tableName)))
	}

	// Validate url queries
	limit := queries.validateIntQuery("rows", rowCountParams)
	offset := queries.validateIntQuery("from", offsetParams)
	where := queries.createWhereClause(d, tableName)

	// SQL query
	statement := fmt.Sprintf(`
		SELECT row_to_json(t)
		FROM (
			SELECT * FROM %s
			%s
			LIMIT $1 OFFSET $2
		) t
	`, tableName, where)

	rows, err := d.SQL.QueryContext(ctx, statement, limit, offset)
	if err != nil {
		return nil, errortrace.NewTrace(err)
	}

	// Create a JSON array
	var results []JsonMap
	for rows.Next() {
		var result string

		err = rows.Scan(&result)
		if err != nil {
			return nil, errortrace.NewTrace(err)
		}

		resultJson, trace := stringToJsonMap(result)
		if trace.HasError() {
			return nil, errortrace.NilTrace()
		}
		results = append(results, resultJson)
	}

	return results, errortrace.NilTrace()
}

// QueryCount validates table and return row count
func (d *DB) QueryCount(tableName string) []JsonMap {
	ctx, cancel := getContext()
	defer cancel()

	// Validate tableName
	if !d.validTable(tableName) {
		return nil
	}

	// SQL query
	statement := fmt.Sprintf(`
		SELECT row_to_json(t)
		FROM (
			SELECT count(*) FROM %s
		) t
	`, tableName)
	//fmt.Println(statement)

	rows, err := d.SQL.QueryContext(ctx, statement)
	if err != nil {
		return nil
	}

	// Create a JSON array
	var results []JsonMap
	for rows.Next() {
		var result string

		err = rows.Scan(&result)
		if err != nil {
			return nil
		}

		resultJson, trace := stringToJsonMap(result)
		if trace.HasError() {
			return nil
		}
		results = append(results, resultJson)
	}

	return results
}

func (d *DB) SubsessionResults(id int) []JsonMap {
	ctx, cancel := getContext()
	defer cancel()

	// SQL query
	statement := `
		SELECT row_to_json(t)
		FROM (
			SELECT * 
			FROM results
			JOIN subsessions USING (subsession_id)
			JOIN sessions USING (session_id)
			JOIN customers USING (cust_id)
			JOIN cars USING (car_id)
			WHERE subsession_id=$1 AND simsession_number=0
		) t
	`

	rows, err := d.SQL.QueryContext(ctx, statement, id)

	// Create a JSON array
	var results []JsonMap
	if rows == nil {
		return results
	}

	for rows.Next() {
		var result string

		err = rows.Scan(&result)
		if err != nil {
			return nil
		}

		resultJson, trace := stringToJsonMap(result)
		if trace.HasError() {
			return nil
		}
		results = append(results, resultJson)
	}

	return results
}

func (d *DB) Seasons(seriesId int) []models.Season {
	ctx, cancel := getContext()
	defer cancel()

	statement := `
		SELECT season_id,
			   season_name,
			   season_short_name,
			   season_year,
			   season_quarter,
			   series_id,
			   license_group,
			   driver_changes,
			   car_classes
		FROM seasons
		WHERE series_id=$1
		ORDER BY season_id DESC
	`

	rows, err := d.SQL.QueryContext(ctx, statement, seriesId)

	var seasons []models.Season
	if err != nil {
		log.Println("error retrieving seasons:", err)
		return seasons
	}

	for rows.Next() {
		var season models.Season
		err = rows.Scan(
			&season.Id,
			&season.SeasonName,
			&season.SeasonShortName,
			&season.SeasonYear,
			&season.SeasonQuarter,
			&season.SeriesId,
			&season.LicenseGroup,
			&season.DriverChanges,
			pq.Array(&season.CarClasses),
		)

		if len(season.CarClasses) < 1 {
			season.CarClasses = []int64{1}
		}

		seasons = append(seasons, season)
	}

	//fmt.Println(seasons)
	return seasons
}

func (d *DB) Series(id int, active bool) models.Series {
	seriesList := d.SeriesList(id, active)

	if len(seriesList) < 1 {
		return models.Series{}
	}

	return seriesList[0]
}

func (d *DB) SeriesList(id int, active bool) []models.Series {
	ctx, cancel := getContext()
	defer cancel()

	statement := `
		SELECT DISTINCT series_id,
			   series_short_name,
			   series_logo,
			   s.license_category_id,
			   license_category,
			   active,
			   official,
			   fixed_setup,
			   min_license_level,
			   forum_url,
			   min_starters,
			   max_starters,
			   large_image,
			   series_copy,
			   small_image
-- 			   AVG(new_sub_level - old_sub_level) / 100 as sr_change
		FROM series s
		JOIN license_categories USING (license_category_id)
-- 		JOIN seasons USING (series_id)
-- 		JOIN sessions USING (season_id)
-- 		JOIN subsessions USING (session_id)
-- 		JOIN results USING (subsession_id)
-- 		WHERE start_time > ((select max(start_time) from sessions)::integer - (86400*7))
	`

	if id > 0 || active {
		statement += "\nWHERE"
	}

	if id > 0 {
		statement += fmt.Sprintf(" series_id = %d ", id)
	}
	if active {
		statement += " active = true"
	}

	var seriess []models.Series

	rows, err := d.SQL.QueryContext(ctx, statement)
	if err != nil {
		log.Println("error querying series: ", err)
		return seriess
	}

	for rows.Next() {

		var series models.Series
		err = rows.Scan(
			&series.Id,
			&series.Name,
			&series.Logo,
			&series.CategoryId,
			&series.Category,
			&series.Active,
			&series.Official,
			&series.FixedSetup,
			&series.MinLicenseLevel,
			&series.ForumUrl,
			&series.MinStarters,
			&series.MaxStarters,
			&series.LargeImage,
			&series.SeriesCopy,
			&series.SmallImage,
			//&series.SrChange,
		)
		if err != nil {
			log.Println("error scanning session rows: ", err)
			return nil
		}

		seriess = append(seriess, series)
	}

	return seriess
}

func (d *DB) SeriesPopularity() []models.Series {
	ctx, cancel := getContext()
	defer cancel()

	isoYear, isoWeek := time.Now().Add(-1 * 24 * time.Hour).UTC().ISOWeek()

	statement := `
		SELECT sp.series_id,
-- 			   s.series_short_name,
-- 			   s.series_logo,
			   s.license_category_id,
			   lc.license_category,
			   s.min_license_level,
			   sp.session_count,
			   sp.subsession_count,
			   sp.total_entry_count,
			   t.track_name,
			   t.config_name
		FROM series_popularity sp
		JOIN series s USING (series_id)
		JOIN license_categories lc USING (license_category_id)
-- 		JOIN race_weeks rc ON rc.season_id = sp.season_id AND rc.race_week_num = sp.race_week_num
		JOIN tracks t USING (track_id)
		WHERE iso_year = $1
		AND iso_week = $2
	`

	rows, err := d.SQL.QueryContext(ctx, statement, isoYear, isoWeek)
	if err != nil {
		log.Println("error querying series_popularity: ", err)
	}

	var seriess []models.Series
	for rows.Next() {
		var series models.Series
		var sessionCount sql.NullInt32
		var subsessionCount sql.NullInt32
		var totalEntryCount sql.NullInt32
		var trackName string
		var configName string

		err = rows.Scan(
			&series.Id,
			//&series.Name,
			//&series.Logo,
			&series.CategoryId,
			&series.Category,
			&series.MinLicenseLevel,
			&sessionCount,
			&subsessionCount,
			&totalEntryCount,
			&trackName,
			&configName,
		)

		if err != nil {
			log.Println("error scanning from series_popularity: ", err)
		}

		if sessionCount.Valid {
			series.SessionCount = int(sessionCount.Int32)
		}
		if subsessionCount.Valid {
			series.SubsessionCount = int(subsessionCount.Int32)
		}
		if totalEntryCount.Valid {
			series.TotalEntryCount = int(totalEntryCount.Int32)
		}

		series.Track = fullTrackName(trackName, configName)

		seriess = append(seriess, series)
	}

	return seriess
}

func (d *DB) SeriesSessions(seriesId int) []models.Session {
	ctx, cancel := getContext()
	defer cancel()

	seasonId := d.LatestSeriesSeason(seriesId)
	year, week := d.LatestSeriesWeek(seriesId)
	//fmt.Println(seasonId, year, week)

	statement := `
		SELECT session_id,
			   race_week_num,
			   start_time,
			   max(end_time),
			   license_category_id,
			   count(*) as subsession_count,
			   sum(field_size) as drivers,
			   track_id
		FROM sessions s
		JOIN subsessions ss USING (session_id)
		WHERE iso_year = $1
		AND iso_week = $2
		AND season_id = $3
		GROUP BY s.session_id
		ORDER BY session_id DESC
-- 		LIMIT 10
	`

	rows, err := d.SQL.QueryContext(ctx, statement, year, week, seasonId)

	var sessions []models.Session
	if err != nil {
		log.Println("error querying series sessions:", err)
		return sessions
	}

	for rows.Next() {
		var session models.Session

		err = rows.Scan(
			&session.SessionId,
			&session.RaceWeekNum,
			&session.StartTime,
			&session.EndTime,
			&session.CategoryId,
			&session.SubsessionCount,
			&session.EntryCount,
			&session.TrackId,
		)

		if err != nil {
			log.Println("error scanning series sessions:", err)
			continue
		}

		session.RaceWeekNum++ // DB race week starts from 0, increment to account for that
		sessions = append(sessions, session)
	}

	return sessions
}

func (d *DB) Sessions() []models.Session {
	return d.sessions("", true, 1000)
}

func (d *DB) sessions(where string, recent bool, limit int) []models.Session {
	ctx, cancel := getContext()
	defer cancel()

	if recent && len(where) > 1 {
		where = " AND " + where
	}

	if recent {
		endTime := d.LatestSubsessionTime() - 86400
		where = fmt.Sprintf(" end_time > %d", endTime) + where
	}

	statement := fmt.Sprintf(`
		SELECT session_id,
			   series_logo,
			   series_short_name,
			   start_time,
			   max(end_time) as end_time,
			   count(*),
			   track_id,
			   track_name,
			   config_name,
			   s.license_category_id,
			   sr.min_license_level,
			   sr.series_id
		FROM sessions s
		join subsessions sb using (session_id)
		join seasons se using (season_id)
		join series sr using (series_id)
		join tracks t using (track_id)
		where %s
		group by session_id, series_logo, series_short_name, track_name, config_name, sr.min_license_level, sr.series_id
		order by session_id desc
		LIMIT %d
	`, where, limit)

	//d.LatestSubsessionTime()-int(24*time.Hour/time.Second)

	var sessions []models.Session

	rows, err := d.SQL.QueryContext(ctx, statement)
	if err != nil {
		log.Println("error querying db/sessions: ", err)
		return sessions
	}

	for rows.Next() {

		var session models.Session
		var trackName string
		var trackConfig string
		err = rows.Scan(
			&session.SessionId,
			&session.SeriesLogo,
			&session.SeriesShortName,
			&session.StartTime,
			&session.EndTime,
			&session.SubsessionCount,
			&session.TrackId,
			&trackName,
			&trackConfig,
			&session.CategoryId,
			&session.MinLicenseLevel,
			&session.SeriesId,
		)
		if err != nil {
			log.Println("error scanning session rows: ", err)
			return nil
		}

		session.Track = trackName

		if trackConfig != "" {
			session.Track += " - " + trackConfig
		}

		session.Id = session.SessionId
		sessions = append(sessions, session)
	}

	return sessions
}

func (d *DB) Subsession(id int) models.Subsession {
	ctx, cancel := getContext()
	defer cancel()

	statement := `
		SELECT ss.subsession_id,
			   ss.event_strength_of_field,
			   sr.series_logo,
			   sr.series_short_name,
			   ss.field_size,
			   ss.event_average_lap,
			   ss.num_lead_changes,
			   ss.num_cautions, 
			   s.caution_type,
			   ss.verified,
			   sr.series_id
		from subsessions ss
		JOIN sessions s USING (session_id)
		JOIN seasons se USING (season_id)
		JOIN series sr USING (series_id)
		WHERE subsession_id = $1 
		ORDER BY event_strength_of_field DESC
	`

	row := d.SQL.QueryRowContext(ctx, statement, id)

	var subsession models.Subsession
	err := row.Scan(
		&subsession.Id,
		&subsession.StrengthOfField,
		&subsession.SeriesLogo,
		&subsession.SeriesName,
		&subsession.FieldSize,
		&subsession.AverageLap,
		&subsession.LeadChanges,
		&subsession.Cautions,
		&subsession.CautionType,
		&subsession.Verified,
		&subsession.SeriesId,
	)

	if err != nil {
		log.Println("error scanning subsession: ", err)
	}

	return subsession
}

func (d *DB) Subsessions(sessionId int) []models.Subsession {
	ctx, cancel := getContext()
	defer cancel()

	statement := `
		SELECT subsession_id,
			   event_strength_of_field,
			   series_logo,
			   series_short_name,
			   field_size,
			   event_average_lap,
			   num_lead_changes,
			   num_cautions, 
			   caution_type,
			   verified,
			   series_id
		from subsessions
		JOIN sessions USING (session_id)
		JOIN seasons USING (season_id)
		JOIN series USING (series_id)
		JOIN results USING (subsession_id)
		WHERE session_id = $1 AND simsession_number=0
		GROUP BY subsession_id, event_strength_of_field, series_logo, series_short_name, caution_type, series_id
		ORDER BY event_strength_of_field DESC
	`

	var subsessions []models.Subsession

	rows, err := d.SQL.QueryContext(ctx, statement, sessionId)
	if err != nil {
		log.Println("error querying db/sessions: ", err)
		return subsessions
	}

	for rows.Next() {

		var subsession models.Subsession
		err = rows.Scan(
			&subsession.Id,
			&subsession.StrengthOfField,
			&subsession.SeriesLogo,
			&subsession.SeriesName,
			&subsession.FieldSize,
			&subsession.AverageLap,
			&subsession.LeadChanges,
			&subsession.Cautions,
			&subsession.CautionType,
			&subsession.Verified,
			&subsession.SeriesId,
		)
		if err != nil {
			log.Println("error scanning session rows: ", err)
			return nil
		}

		subsession.HasCautions = slices.Contains([]int{3, 4}, subsession.CautionType)

		subsessions = append(subsessions, subsession)
	}

	return subsessions

}

func (d *DB) TrackConfigs(id int) []models.TrackConfigs {
	ctx, cancel := getContext()
	defer cancel()

	statement := `
		SELECT track_id, config_name
		FROM tracks
		WHERE package_id = $1
		ORDER BY track_id
	`

	rows, err := d.SQL.QueryContext(ctx, statement, id)
	if err != nil {
		log.Println("error querying track configs:", err)
	}

	var configs []models.TrackConfigs
	for rows.Next() {
		var config models.TrackConfigs
		err = rows.Scan(
			&config.Id,
			&config.Name,
		)

		if err != nil {
			log.Println("error scanning track configs: ", err)
			continue
		}

		configs = append(configs, config)
	}

	return configs
}

func (d *DB) TrackFirstRace(id int) int {
	ctx, cancel := getContext()
	defer cancel()

	statement := `
		SELECT min(start_time)
		FROM sessions 
		WHERE track_id = $1
		LIMIT 1
	`

	row := d.SQL.QueryRowContext(ctx, statement, id)

	var startTime int
	err := row.Scan(&startTime)
	if err != nil {
		log.Println("error scanning track first race sessions: ", err)
		return 0
	}

	return startTime
}

func (d *DB) TrackInfo(id int) {

}

// TODO Create track_owners table

func (d *DB) TrackOwners(id int) int {
	ctx, cancel := getContext()
	defer cancel()

	packageId := d.GetTrackPackage(id)

	statement := `
		SELECT count(*)
		FROM track_owners
		WHERE track_package_id = $1
	`

	row := d.SQL.QueryRowContext(ctx, statement, packageId)

	var ownerCount int
	err := row.Scan(&ownerCount)
	if err != nil {
		log.Println("error scanning track owners: ", err)
		return 0
	}

	return ownerCount
}

func (d *DB) TrackSeriesUsesList(id int) []models.Season {
	ctx, cancel := getContext()
	defer cancel()

	seasonIds := d.currentSeriesSeasonIds()
	//fmt.Println("season ids", seasonIds)

	statement := `
		SELECT series_id, season_year, season_quarter, race_week_num
		FROM race_weeks rw 
		JOIN seasons s USING (season_id)
		WHERE track_id = $1
		AND season_id = ANY($2)
	`

	rows, err := d.SQL.QueryContext(ctx, statement, id, seasonIds)
	if err != nil {
		log.Println("error querying track series list: ", err)
		return []models.Season{}
	}

	var trackUses []models.Season
	for rows.Next() {
		var trackUse models.Season
		err = rows.Scan(&trackUse.SeriesId, &trackUse.SeasonYear, &trackUse.SeasonQuarter, &trackUse.RaceWeek.RaceWeekNum)
		if err != nil {
			log.Println("error scanning track use:", err)
			continue
		}
		trackUses = append(trackUses, trackUse)
	}
	//fmt.Println(trackUses)

	return trackUses
}

func (d *DB) TrackUsesPerSeason(id int) []models.TrackSeasonUse {
	ctx, cancel := getContext()
	defer cancel()

	statement := `
		SELECT season_year, season_quarter, count(*)
		FROM race_weeks rw 
		JOIN seasons s USING (season_id)
		WHERE track_id = $1
		GROUP BY season_year, season_quarter
		ORDER BY season_year, season_quarter
	`

	rows, err := d.SQL.QueryContext(ctx, statement, id)
	if err != nil {
		log.Println("error querying track uses per season: ", err)
	}

	var trackSeasonUses []models.TrackSeasonUse
	for rows.Next() {
		var seasonUse models.TrackSeasonUse
		err = rows.Scan(
			&seasonUse.SeasonYear,
			&seasonUse.SeasonQuarter,
			&seasonUse.Count,
		)

		if err != nil {
			log.Println("error scanning track uses per season: ", err)
			continue
		}

		trackSeasonUses = append(trackSeasonUses, seasonUse)
	}

	return fillSeasonUses(trackSeasonUses)
}

func fillSeasonUses(trackUses []models.TrackSeasonUse) []models.TrackSeasonUse {

	if len(trackUses) < 1 {
		return trackUses
	}

	seasonUseMap := make(map[int]map[int]int)

	for _, use := range trackUses {
		if _, ok := seasonUseMap[use.SeasonYear]; !ok {
			seasonUseMap[use.SeasonYear] = make(map[int]int)
		}
		seasonUseMap[use.SeasonYear][use.SeasonQuarter] = use.Count
	}

	startpoint := trackUses[0]
	endpoint := trackUses[len(trackUses)-1]

	//fmt.Println(startpoint, endpoint)

	var filledSeasonUses []models.TrackSeasonUse
	for year := startpoint.SeasonYear; year <= endpoint.SeasonYear; year++ {
		for quarter := 1; quarter <= 4; quarter++ {

			if year == endpoint.SeasonYear && quarter > endpoint.SeasonQuarter {
				break
			}

			if year == startpoint.SeasonYear && quarter < startpoint.SeasonQuarter {
				continue
			}

			seasonUse := models.TrackSeasonUse{
				SeasonYear:    year,
				SeasonQuarter: quarter,
			}

			if _, ok := seasonUseMap[year][quarter]; !ok {
				seasonUse.Count = 0
			} else {
				seasonUse.Count = seasonUseMap[year][quarter]
			}

			seasonUse.SeasonLabel = fmt.Sprintf("%dS%d", seasonUse.SeasonYear, seasonUse.SeasonQuarter)

			filledSeasonUses = append(filledSeasonUses, seasonUse)
		}
	}

	return filledSeasonUses
}

func (d *DB) Users(name string) []map[string]any {
	ctx, cancel := getContext()
	defer cancel()

	//fmt.Println(name)

	statement := fmt.Sprintf(`
		SELECT cust_id, display_name
		FROM customers
		WHERE display_name ilike '%%%s%%'
	`, name)

	//fmt.Println(statement)

	rows, err := d.SQL.QueryContext(ctx, statement)
	if err != nil {
		log.Println("error querying users:", err)
	}

	var customers []map[string]any
	for rows.Next() {
		var custId int
		var displayName string
		err = rows.Scan(&custId, &displayName)
		if err != nil {
			log.Println("error scanning users:", err)
			continue
		}

		customer := make(map[string]any)
		customer["id"] = custId
		customer["display_name"] = displayName

		customers = append(customers, customer)
	}

	return customers
}

func (d *DB) DriverInfo(id int) models.User {
	ctx, cancel := getContext()
	defer cancel()

	// Driver
	statement := `
		SELECT cust_id, 
			   display_name, 
			   member_since, 
			   c.club_id, 
			   club_name
		FROM customers c
		JOIN clubs cl USING (club_id)
		WHERE cust_id = $1
	`

	row := d.SQL.QueryRowContext(ctx, statement, id)

	var user models.User
	err := row.Scan(
		&user.Id,
		&user.Name,
		&user.MemberSince,
		&user.ClubId,
		&user.ClubName,
	)
	if err != nil {
		log.Println("error scanning driver:", err)
	}

	user.Licenses = d.driverLicenses(id)

	return user
}

func (d *DB) driverLicenses(id int) map[int]models.License {
	ctx, cancel := getContext()
	defer cancel()

	statement := `
		SELECT license_category_id,
			   license_level,
			   sub_level,
			   irating
		FROM customer_licenses
		WHERE cust_id = $1
	`

	rows, err := d.SQL.QueryContext(ctx, statement, id)
	if err != nil {
		log.Println("error querying driver licenses: ", err)
		return make(map[int]models.License)
	}

	licenses := make(map[int]models.License)
	for rows.Next() {
		var license models.License

		err = rows.Scan(
			&license.CategoryId,
			&license.Level,
			&license.SubLevel,
			&license.IRating,
		)

		if err != nil {
			log.Println("error scanning driver license: ", err)
			continue
		}

		licenses[license.CategoryId] = license
	}

	return licenses
}

// uncachedDriverRaces updates the cache for given customer and returns rows affected
func (d *DB) uncachedDriverRaces(custId, maxSubsession, minSubsession int) []models.DriverRace {

	// Constrain search if cache already exists
	subsessionConstraint := ""
	if maxSubsession != 0 {
		subsessionConstraint = fmt.Sprintf(
			" AND subsession_id NOT BETWEEN %d AND %d",
			minSubsession, maxSubsession,
		)
	}

	statement := `
		SELECT r.result_id,
			   r.subsession_id,
			   r.finish_position_in_class,
			   r.laps_lead,
			   r.average_lap,
			   r.best_lap_time,
			   r.laps_complete,
			   r.car_id,
			   r.old_sub_level,
			   r.new_sub_level,
			   r.oldi_rating,
			   r.newi_rating,
			   r.starting_position_in_class,
	-- 				   sr.series_id,
	-- 				   sr.series_short_name,
	-- 				   sr.series_logo,
	-- 				   sr.min_license_level,
			   r.incidents,
			   r.reason_out_id,
	-- 				   c.car_name,
	-- 				   c.logo as car_logo,
	-- 				   t.track_id,
	-- 				   t.track_name,
	-- 				   t.config_name,
	-- 				   t.track_config_length,
	-- 				   t.logo as track_logo
			   s.license_category_id,
			   s.season_id,
			   s.start_time,
			   se.series_id,
			   ss.event_strength_of_field,
			   ss.event_laps_complete,
			   ss.end_time,
			   ss.field_size,
			   s.track_id
			FROM results r
			JOIN subsessions ss USING (subsession_id)
			JOIN sessions s USING (session_id)
			JOIN seasons se USING (season_id)
-- 			JOIN series sr USING (series_id)
	-- 			JOIN cars c USING (car_id)
	-- 			JOIN tracks t USING (track_id)
			WHERE cust_id = $1 AND simsession_number=0
	-- 			ORDER BY subsession_id DESC
	` + subsessionConstraint

	rows, err := d.SQL.Query(statement, custId)
	if err != nil {
		log.Println("error updating results cache: ", err)
	}

	// Create a JSON array
	var driverRaces []models.DriverRace
	for rows.Next() {
		var driverRace models.DriverRace

		err = rows.Scan(
			&driverRace.ResultId,
			&driverRace.SubsessionId,
			&driverRace.FinishPositionInClass,
			&driverRace.LapsLead,
			&driverRace.AverageLap,
			&driverRace.BestLapTime,
			&driverRace.LapsComplete,
			&driverRace.CarId,
			&driverRace.OldSubLevel,
			&driverRace.NewSubLevel,
			&driverRace.OldiRating,
			&driverRace.NewiRating,
			&driverRace.StartingPositionInClass,
			&driverRace.Incidents,
			&driverRace.ReasonOutId,
			&driverRace.CategoryId,
			&driverRace.SeasonId,
			&driverRace.StartTime,
			&driverRace.SeriesId,
			&driverRace.StrengthOfField,
			&driverRace.EventLapsComplete,
			&driverRace.EndTime,
			&driverRace.FieldSize,
			&driverRace.TrackId,
		)

		if err != nil {
			log.Println("error scanning driver_results: ", err)
			continue
		}

		driverRaces = append(driverRaces, driverRace)
	}

	return driverRaces
}
