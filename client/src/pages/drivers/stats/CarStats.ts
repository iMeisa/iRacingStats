import {DriverRace} from "../../../models/driver/Race.ts";

type statsType = {
    id: number,
    car_name: string,
    car_logo: string,
    races: number,
    wins: number,
    podiums: number,
    race_time: number,
    incidents: number,
    inc_avg: number,
    laps: number,
    laps_lead: number,
    distance_mi: number,
    distance_km: number,
}

export default function CarStats(races: DriverRace[], loading: boolean): Record<string, unknown>[] {

    if (loading) return []

    let cars: Record<number, statsType> = {}

    for (const i in races) {
        const race = races[i]
        const car_id = race.car_id

        const average_lap = race.average_lap
        const laps_complete = race.laps_complete
        const incidents = race.incidents
        const finish_pos = race.finish_position_in_class
        const valid_result = race.valid_race

        // Initial declaration
        if (!( car_id in cars )) {
            cars[car_id] = {
                id: car_id,
                car_name: race.car_name,
                car_logo: race.car_logo,
                races: 0,
                wins: 0,
                podiums: 0,
                race_time: 0,
                incidents: 0,
                inc_avg: 0,
                laps: 0,
                laps_lead: 0,
                distance_mi: 0,
                distance_km: 0,
            }
        }

        // Races
        cars[car_id].races++
        // Wins
        if ( finish_pos == 0 && valid_result ) cars[car_id].wins++
        // Podiums
        if ( finish_pos < 3 && valid_result ) cars[car_id].podiums++
        // Race Time
        cars[car_id].race_time += laps_complete * average_lap
        // Incidents
        cars[car_id].incidents += incidents
        // Laps
        cars[car_id].laps += laps_complete
        // Laps Lead
        cars[car_id].laps_lead += race.laps_lead
        // Distance Driven
        cars[car_id].distance_mi += Math.round(race.track_config_length * laps_complete)

    }

    // console.log("cars:", cars)

    let stats: statsType[] = []
    for (const i in cars) {
        const car = cars[i]
        // Add km distance
        car.distance_km = Math.round(car.distance_mi * 1.609)

        // Incident average
        car.inc_avg = car.incidents / car.races
        stats.push(car)
    }

    // @ts-ignore
    stats.sort((a,b) => (a.races < b.races) ? 1 : ((b.races < a.races) ? -1 : 0));
    // console.log("stats:", stats)

    return stats
}
