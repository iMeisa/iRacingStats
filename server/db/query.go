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
			JOIN seasons USING (season_id)
			JOIN series USING (series_id)
			JOIN customers USING (cust_id)
			JOIN cars USING (car_id)
			WHERE cust_id=$1 AND simsession_number=0
			ORDER BY subsession_id DESC
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

func (d *DB) Sessions() []models.Session {
	ctx, cancel := getContext()
	defer cancel()

	statement := `
		SELECT session_id,
			   series_logo,
			   series_short_name,
			   max(end_time) as end_time,
			   count(session_id),
			   track_name,
			   config_name,
			   s.license_category_id,
			   sr.min_license_level,
			   sr.series_id
		FROM sessions s
		join subsessions sb using (session_id)
		join seasons se using (season_id)
		join series sr using (series_id)
		join race_weeks using (season_id, race_week_num)
		left join tracks t on t.track_id = s.track_id 
		where end_time > ((select max(end_time) from subsessions)::integer - 86400)
		group by session_id, series_logo, series_short_name, track_name, config_name, sr.min_license_level, sr.series_id
		order by session_id desc
	`

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
			   count(subsession_id) AS field_size,
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
		SELECT cust_id, display_name, member_since, c.club_id, club_name
		FROM customers c
		JOIN clubs cl USING (club_id)
		WHERE cust_id = $1
	`

	row := d.SQL.QueryRowContext(ctx, statement, id)

	var users []models.User
	var user models.User
	err := row.Scan(&user.Id, &user.Name, &user.MemberSince, &user.ClubId, &user.ClubName)
	if err != nil {
		log.Println("error scanning users:", err)
	}

	// Licenses
	statement = `
		SELECT license_category_id, 
			   new_license_level, 
			   new_sub_level, 
			   newi_rating,
			   event_strength_of_field,
			   finish_position_in_class,
	   		   (SELECT count(*) FROM results WHERE subsession_id = s.subsession_id AND simsession_number = 0) AS drivers
		FROM results r
		JOIN subsessions s USING (subsession_id)
		JOIN sessions s2 USING (session_id)
		WHERE cust_id = $1 AND simsession_number = 0 AND subsession_id IN (
			SELECT max(subsession_id)
			FROM results r 
			JOIN subsessions s USING (subsession_id)
			JOIN sessions s2 USING (session_id)
			WHERE cust_id = $1
			GROUP BY license_category_id
		)
		GROUP BY license_category_id, new_license_level, new_sub_level, newi_rating, event_strength_of_field, finish_position_in_class, s.subsession_id 
	`

	rows, err := d.SQL.QueryContext(ctx, statement, id)
	if err != nil {
		log.Println("error querying user licenses: ", err)
	}

	var licenses models.UserLicenses
	for rows.Next() {
		var category int
		var license models.License

		var sof float32
		var pos float32
		var fieldSize float32

		err = rows.Scan(&category, &license.Level, &license.SubLevel, &license.IRating, &sof, &pos, &fieldSize)
		if err != nil {
			log.Println("error scanning license: ", err)
		}

		// iRating estimation
		if license.IRating < 0 {
			pos++
			var halfField = fieldSize / 2
			license.IRating = int(sof + ((halfField - pos) / halfField * 100))
		}

		switch category {
		case 1:
			licenses.Oval = license
		case 2:
			licenses.Road = license
		case 3:
			licenses.DirtOval = license
		case 4:
			licenses.DirtRoad = license
		}

	}

	user.Licenses = licenses

	users = append(users, user)

	return users
}
