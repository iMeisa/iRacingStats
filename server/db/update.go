package db

import (
	"fmt"
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

// UpdateResultsCache updates the cache for given customer and returns rows affected
func (d *DB) UpdateResultsCache(custId int) int {

	updated, subsessionId, minSubsessionId := d.UserCacheUpdated(custId)
	if updated {
		return 0
	}

	subsessionConstraint := ""
	if subsessionId != 0 {
		subsessionConstraint = fmt.Sprintf(
			" AND subsession_id > %d AND subsession_id < %d",
			subsessionId, minSubsessionId,
		)
	}

	statement := fmt.Sprintf(`
		INSERT INTO results_cache (
			result_id, subsession_id, simsession_number, cust_id, team_id, finish_position, 
			finish_position_in_class, laps_lead, laps_complete, opt_laps_complete, interval, class_interval, 
			average_lap, best_lap_num, best_lap_time, best_nlaps_num, best_nlaps_time, best_qual_lap_at, 
			best_qual_lap_num, best_qual_lap_time, reason_out_id, champ_points, drop_race, club_points, position, 
			qual_lap_time, starting_position, starting_position_in_class, car_class_id, division, old_license_level, 
			old_sub_level, old_cpi, oldi_rating, old_ttrating, new_license_level, new_sub_level, new_cpi, newi_rating, 
			new_ttrating, multiplier, license_change_oval, license_change_road, incidents, max_pct_fuel_fill, 
			weight_penalty_kg, league_points, league_agg_points, car_id, aggregate_champ_points, ai
		) 
		SELECT result_id, subsession_id, simsession_number, cust_id, team_id, finish_position, 
			finish_position_in_class, laps_lead, laps_complete, opt_laps_complete, interval, class_interval, 
			average_lap, best_lap_num, best_lap_time, best_nlaps_num, best_nlaps_time, best_qual_lap_at, 
			best_qual_lap_num, best_qual_lap_time, reason_out_id, champ_points, drop_race, club_points, position, 
			qual_lap_time, starting_position, starting_position_in_class, car_class_id, division, old_license_level, 
			old_sub_level, old_cpi, oldi_rating, old_ttrating, new_license_level, new_sub_level, new_cpi, newi_rating, 
			new_ttrating, multiplier, license_change_oval, license_change_road, incidents, max_pct_fuel_fill, 
			weight_penalty_kg, league_points, league_agg_points, car_id, aggregate_champ_points, ai
		FROM results
		WHERE simsession_number = 0
		AND cust_id = $1
		%s
		ON CONFLICT (result_id) DO NOTHING
	`, subsessionConstraint)

	exec, err := d.SQL.Exec(statement, custId)
	if err != nil {
		log.Println("error updating results cache: ", err)
	}

	rowsAffected, err := exec.RowsAffected()
	if err != nil {
		log.Println("error getting rows affected from results cache: ", err)
	}

	return int(rowsAffected)
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
