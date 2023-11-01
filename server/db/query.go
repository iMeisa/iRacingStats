package db

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/iMeisa/errortrace"
	"github.com/iMeisa/iRacingStats/server/models"
	"log"
	"time"
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
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	row := d.SQL.QueryRowContext(ctx, "SELECT max(end_time) FROM subsessions")

	var latestTime int
	err := row.Scan(&latestTime)
	if err != nil {
		return 0
	}

	return latestTime
}

// Query validates and executes api query requested by the user
func (d *DB) Query(tableName string, queries UrlQueryMap) ([]JsonMap, errortrace.ErrorTrace) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
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

func (d *DB) Sessions() []models.Session {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	statement := `
		SELECT session_id,
			   series_logo,
			   series_short_name,
			   max(end_time) as end_time,
			   count(session_id),
			   track_name,
			   config_name
		FROM sessions s
		join subsessions sb using (session_id)
		join seasons se using (season_id)
		join series sr using (series_id)
		join race_weeks using (season_id, race_week_num)
		join tracks using (track_id)
		where end_time > ((select max(end_time) from subsessions)::integer - 86400)
		group by session_id, series_logo, series_short_name, track_name, config_name
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
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	statement := `
		SELECT subsession_id,
			   event_strength_of_field,
			   series_logo,
			   series_short_name,
			   count(subsession_id) AS field_size,
			   event_average_lap,
			   num_lead_changes,
			   num_cautions
		from subsessions
		JOIN sessions USING (session_id)
		JOIN seasons USING (season_id)
		JOIN series USING (series_id)
		JOIN results USING (subsession_id)
		WHERE session_id = $1 AND simsession_number=0
		GROUP BY subsession_id, event_strength_of_field, series_logo, series_short_name
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
		)
		if err != nil {
			log.Println("error scanning session rows: ", err)
			return nil
		}

		subsessions = append(subsessions, subsession)
	}

	return subsessions

}
