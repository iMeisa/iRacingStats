package db

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/iMeisa/errortrace"
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
	fmt.Println(statement)

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
