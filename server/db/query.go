package db

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/iMeisa/errortrace"
	"strconv"
	"time"
)

const LimitDefault = 10
const LimitMax = 50

type JsonMap map[string]interface{}
type UrlQueryMap map[string]string

func stringToJsonMap(jsonString string) (JsonMap, errortrace.ErrorTrace) {
	var jsonMap JsonMap
	err := json.Unmarshal([]byte(jsonString), &jsonMap)
	if err != nil {
		return jsonMap, errortrace.NewTrace(err)
	}

	return jsonMap, errortrace.NilTrace()
}

func (q UrlQueryMap) getLimit() int {

	// Check if limit query exists
	val, ok := q["limit"]
	if !ok {
		return LimitDefault
	}

	// Check if int
	limit, err := strconv.Atoi(val)
	if err != nil {
		return LimitDefault
	}

	// Check if not more than max
	if limit > LimitMax {
		return LimitMax
	}

	return limit
}

func (d *DB) Query(tableName string, queries UrlQueryMap) ([]JsonMap, errortrace.ErrorTrace) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	// Validate tableName
	if !d.validTable(tableName) {
		return nil, errortrace.NewTrace(errors.New("invalid table name"))
	}

	// Set max limit to LimitMax
	limit := queries.getLimit()

	statement := fmt.Sprintf(`
		select row_to_json(t)
		from (
			select * from %s
			limit $1
		) t
	`, tableName)
	fmt.Println(statement)

	rows, err := d.SQL.QueryContext(ctx, statement, limit)
	if err != nil {
		return nil, errortrace.NewTrace(err)
	}

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

	//fmt.Println(results)

	//resultsJson, err := json.Marshal(results)
	//if err != nil {
	//	return "", errortrace.NewTrace(err)
	//}
	//
	//fmt.Println(resultsJson)
	//
	//return "", errortrace.NilTrace()
}
