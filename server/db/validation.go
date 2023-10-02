package db

import (
	"context"
	"github.com/iMeisa/errortrace"
	"slices"
	"time"
)

func (d *DB) validTable(tableName string) bool {
	return slices.Contains(d.Tables, tableName)
}

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
