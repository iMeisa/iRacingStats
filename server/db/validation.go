package db

import (
	"context"
	"fmt"
	"github.com/iMeisa/errortrace"
	"slices"
	"strconv"
	"time"
)

func (q UrlQueryMap) createWhereClause(db *DB, tableName string) string {

	columns, trace := db.queryTableCols("public", tableName)
	if trace.HasError() {
		trace.Read()
		return ""
	}
	//fmt.Println(columns)

	var columnNames []string
	for key := range columns {
		columnNames = append(columnNames, key)
	}
	//fmt.Println(columnNames)

	clause := "WHERE"

	for key, value := range q {

		// Guard clauses
		// Skip if column isn't valid
		if !slices.Contains(columnNames, key) {
			continue
		}
		// Skip if no value given
		if len(value) < 1 {
			continue
		}

		param := fmt.Sprintf("%s=%s", key, value)

		//fmt.Printf("Is %s a valid column? %v", key, slices.Contains(columnNames, key))
		clause = fmt.Sprint(clause, " ", param)
		fmt.Println(clause)
	}

	// Test if params have been added
	if clause == "WHERE" {
		return ""
	}

	return clause
}

func (q UrlQueryMap) validateIntQuery(key string, definedParams intQuery) int {

	// Check if key exists in query
	val, ok := q[key]
	if !ok {
		return definedParams.defaultValue
	}

	// Check if int
	param, err := strconv.Atoi(val)
	if err != nil {
		return definedParams.defaultValue
	}

	// Check if not more than max
	if param > definedParams.maxValue {
		return definedParams.maxValue
	}

	return param

}

// validTable checks if tableName provided is an existing table
func (d *DB) validTable(tableName string) bool {
	return slices.Contains(d.Tables, tableName)
}

// queryTableCols gets all columns in a table and their data types
func (d *DB) queryTableCols(schema, tableName string) (map[string]string, errortrace.ErrorTrace) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	// VTP queries can be null
	statement := `
		SELECT column_name
		     , data_type
		FROM information_schema.columns
		WHERE table_schema=$1
		AND table_name=$2
	 `

	rows, err := d.SQL.QueryContext(ctx, statement, schema, tableName)
	if err != nil {
		return nil, errortrace.NewTrace(err)
	}

	cols := make(map[string]string)

	for rows.Next() {
		var colName string
		var dataType string

		if err = rows.Scan(&colName, &dataType); err != nil {
			return nil, errortrace.NewTrace(err)
		}

		cols[colName] = dataType
	}

	return cols, errortrace.NilTrace()
}
