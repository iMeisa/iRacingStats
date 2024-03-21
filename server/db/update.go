package db

import (
	"fmt"
	"github.com/iMeisa/iRacingStats/server/models"
	"log"
	"os"
	"time"
)

var visits = make(map[string]int)

func (d *DB) AddPageVisit(page string) {

	if os.Getenv("ENV") == "dev" {
		return
	}

	visits[fmt.Sprintf("%s", page)]++
	//log.Println(visits)
}

// cacheDriverResults updated the driver results cache
func (d *DB) cacheDriverResults(data []models.DriverRace, custId int) {

	// Get min and max subsessions
	maxSubsession := data[0].SubsessionId
	minSubsession := data[0].SubsessionId
	for _, result := range data {
		subsessionId := result.SubsessionId

		if subsessionId > maxSubsession {
			maxSubsession = subsessionId
		}

		if subsessionId < minSubsession {
			minSubsession = subsessionId
		}
	}

	statement := `
		INSERT INTO driver_results_cache 
		(cust_id, latest_subsession, earliest_subsession, data, has_update, result_count)
		VALUES ($1, $2, $3, $4, false, $5)
		ON CONFLICT (cust_id)
		DO UPDATE
		SET
			latest_subsession = $2,
			earliest_subsession = $3,
			data = $4,
			has_update = false
	`

	_, err := d.SQL.Exec(statement, custId, maxSubsession, minSubsession, data, len(data))
	if err != nil {
		log.Println("error caching driver data: ", err)
	}

}

// UpdateResultsCacheReadTime updates the cache last_read column to current time
func (d *DB) UpdateResultsCacheReadTime(custId int) {
	statement := `
		UPDATE results_cache
		SET last_read = $2
		WHERE cust_id = $1
	`

	_, err := d.SQL.Exec(statement, custId, time.Now().Unix())
	if err != nil {
		log.Println("error updating results cache read time: ", err)
	}
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
