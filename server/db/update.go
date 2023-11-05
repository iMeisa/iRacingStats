package db

import (
	"fmt"
	"log"
)

var visits = make(map[string]int)

func (d *DB) AddPageVisit(page string) {
	visits[fmt.Sprintf("%s", page)]++
	//log.Println(visits)
}

func (d *DB) UpdateVisits() {
	ctx, cancel := getContext()
	defer cancel()

	statement := `
		INSERT INTO visits (path, hits) VALUES ($1, $2) ON CONFLICT (path) 
		DO UPDATE SET hits = visits.hits+$2 WHERE visits.path = $1
	`

	for page, hits := range visits {
		//log.Println(page)
		_, err := d.SQL.ExecContext(ctx, statement, page, hits)

		if err != nil {
			log.Println("error inserting page visits: ", err)
		}

		delete(visits, page)
	}
}
