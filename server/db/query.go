package db

import (
	"context"
	"encoding/json"
	"github.com/iMeisa/errortrace"
	"time"
)

type JsonMap map[string]interface{}

func stringToJsonMap(jsonString string) (JsonMap, errortrace.ErrorTrace) {
	var jsonMap JsonMap
	err := json.Unmarshal([]byte(jsonString), &jsonMap)
	if err != nil {
		return jsonMap, errortrace.NewTrace(err)
	}

	return jsonMap, errortrace.NilTrace()
}

func (d *DB) Query(tableName string, limit int) ([]JsonMap, errortrace.ErrorTrace) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	limit = 5

	statement := `
		select row_to_json(t)
		from (
			select * from customers
			limit $1
		) t
	`

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
