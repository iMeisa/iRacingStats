import {DriverRace} from "../../../models/driver/Race.ts";
import {SeriesById} from "../../../cache/CachesById.ts";

type statsType = {
    id: number,
    series_name: string,
    series_logo: string,
    license_category_id: number,
    min_license_level: number,
    races: number,
    wins: number,
    podiums: number,
    incidents: number,
    inc_avg: number,
    finish_total: number,  // Divide this by number of races to get average finish position
    finish_avg: number,
    laps: number,
    laps_lead: number,
}

export default function SeriesStats(races: DriverRace[], loading: boolean): Record<string, unknown>[] {

    if (loading) return []

    const seriesById = SeriesById()

    let series: Record<number, statsType> = {}

    for (const i in races) {
        const race = races[i]
        const series_id = race.series_id

        const laps_complete = race.laps_complete
        const incidents = race.incidents
        const finish_pos = race.finish_position_in_class
        const valid_result = race.valid_race

        // Initial declaration
        if (!( series_id in series )) {
            series[series_id] = {
                id: series_id,
                series_name: seriesById[series_id].series_short_name,
                series_logo: seriesById[series_id].series_logo,
                license_category_id: seriesById[series_id].license_category_id,
                min_license_level: seriesById[series_id].min_license_level,
                races: 0,
                wins: 0,
                podiums: 0,
                incidents: 0,
                inc_avg: 0,
                finish_total: 0,  // Divide this by number of races to get average finish position
                finish_avg: 0,
                laps: 0,
                laps_lead: 0,
            }
        }

        // Races
        series[series_id].races++
        // Wins
        if ( finish_pos == 0 && valid_result ) series[series_id].wins++
        // Podiums
        if ( finish_pos < 3 && valid_result ) series[series_id].podiums++
        // Incidents
        series[series_id].incidents += incidents
        // Finish Total
        series[series_id].finish_total += finish_pos
        // Laps
        series[series_id].laps += laps_complete
        // Laps Lead
        series[series_id].laps_lead += race.laps_lead

    }

    let stats: statsType[] = []
    for (const i in series) {
        const singleSeries = series[i]

        // Incident average
        singleSeries.inc_avg = singleSeries.incidents / singleSeries.races

        // Finish average
        singleSeries.finish_avg = singleSeries.finish_total / singleSeries.races
        singleSeries.finish_avg++  // Offsets finish by 1 to be accurate

        stats.push(singleSeries)
    }

    // @ts-ignore
    stats.sort((a,b) => (a.races < b.races) ? 1 : ((b.races < a.races) ? -1 : 0));
    // console.log("series stats:", stats)

    return stats
}
