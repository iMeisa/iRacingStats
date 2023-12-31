package db

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/iMeisa/errortrace"
	"github.com/iMeisa/iRacingStats/server/models"
	"log"
	"slices"
)

// stringToJsonMap unmarshals string JSON into a JsonMap
func stringToJsonMap(jsonString string) (JsonMap, errortrace.ErrorTrace) {
	var jsonMap JsonMap
	err := json.Unmarshal([]byte(jsonString), &jsonMap)
	if err != nil {
		return jsonMap, errortrace.NewTrace(err)
	}

	return jsonMap, errortrace.NilTrace()
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

// UserCacheUpdated returns boolean if user cache is up-to-date and user latest subsession
func (d *DB) UserCacheUpdated(custId int) (bool, int, int) {
	statement := `
		SELECT max(subsession_id),
			   min(subsession_id),
			   c.latest_subsession
		FROM results_cache rc 
		JOIN customers c USING (cust_id)
		WHERE cust_id = $1
		GROUP BY c.latest_subsession 
	`

	row := d.SQL.QueryRow(statement, custId)

	maxSubsession := 0
	minSubsession := 0
	latestSubsession := 1
	err := row.Scan(&maxSubsession, &minSubsession, &latestSubsession)
	if err != nil {
		log.Println("error scanning if user cache is updated: ", err)
	}

	return maxSubsession == latestSubsession, maxSubsession, minSubsession
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

func (d *DB) DriverResults(id int) []JsonMap {

	d.UpdateResultsCache(id)

	ctx, cancel := getContext()
	defer cancel()

	// SQL query
	statement := `
		SELECT row_to_json(t)
		FROM (
			SELECT r.result_id,
				   r.subsession_id,
				   r.finish_position_in_class,
				   r.laps_lead,
				   r.average_lap,
				   r.best_lap_time,
				   r.laps_complete,
				   r.car_id,
				   s.license_category_id,
				   ss.event_strength_of_field,
				   ss.event_laps_complete,
				   ss.end_time,
				   ss.field_size,
				   sr.series_id,
				   sr.series_short_name,
				   sr.series_logo,
				   sr.min_license_level,
				   r.incidents,
				   r.reason_out_id,
				   c.car_name,
				   c.logo as car_logo,
				   t.track_id,
				   t.track_name,
				   t.config_name,
				   t.track_config_length,
				   t.logo as track_logo
			FROM results_cache r
			JOIN subsessions ss USING (subsession_id)
			JOIN sessions s USING (session_id)
			JOIN seasons se USING (season_id)
			JOIN series sr USING (series_id)
			JOIN cars c USING (car_id)
			JOIN tracks t USING (track_id)
			WHERE cust_id = $1 AND simsession_number=0
			ORDER BY subsession_id DESC
		) t
	`

	rows, err := d.SQL.QueryContext(ctx, statement, id)

	go d.UpdateResultsCacheReadTime(id)

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
	//fmt.Println(statement)

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

func (d *DB) Series(id int, active bool) []models.Series {
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

func (d *DB) SeriesSessions(id int) []models.Session {
	return d.sessions(fmt.Sprintf(" series_id = %d ", id), false, 100)
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

		sessions = append(sessions, session)
	}

	return sessions
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

func (d *DB) User(id int) []models.User {
	ctx, cancel := getContext()
	defer cancel()

	// User
	statement := `
		SELECT cust_id, 
			   display_name, 
			   member_since, 
			   c.club_id, 
			   club_name,
			   oval_license_level,
			   oval_sub_level,
			   oval_irating,
			   road_license_level,
			   road_sub_level,
			   road_irating,
			   dirtoval_license_level,
			   dirtoval_sub_level,
			   dirtoval_irating,
			   dirtroad_license_level,
			   dirtroad_sub_level,
			   dirtroad_irating
		FROM customers c
		JOIN clubs cl USING (club_id)
		WHERE cust_id = $1
	`

	row := d.SQL.QueryRowContext(ctx, statement, id)

	var users []models.User
	var user models.User
	err := row.Scan(
		&user.Id,
		&user.Name,
		&user.MemberSince,
		&user.ClubId,
		&user.ClubName,
		&user.Licenses.Oval.Level,
		&user.Licenses.Oval.SubLevel,
		&user.Licenses.Oval.IRating,
		&user.Licenses.Road.Level,
		&user.Licenses.Road.SubLevel,
		&user.Licenses.Road.IRating,
		&user.Licenses.DirtOval.Level,
		&user.Licenses.DirtOval.SubLevel,
		&user.Licenses.DirtOval.IRating,
		&user.Licenses.DirtRoad.Level,
		&user.Licenses.DirtRoad.SubLevel,
		&user.Licenses.DirtRoad.IRating,
	)
	if err != nil {
		log.Println("error scanning users:", err)
	}

	users = append(users, user)

	return users
}
