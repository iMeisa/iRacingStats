
type statsType = {
    id: number,
    series_name: string,
    series_logo: string,
    license_category_id: number,
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

export default function SeriesStats(results: Record<string, unknown>[]): Record<string, unknown>[] {

    let series: Record<number, statsType> = {}

    for (const i in results) {
        const result = results[i]
        const series_id = result['series_id'] as number

        const laps_complete = result['laps_complete'] as number
        const incidents = result['incidents'] as number
        const finish_pos = result['finish_position_in_class'] as number
        const valid_result = result['valid_race'] as boolean

        // Initial declaration
        if (!( series_id in series )) {
            series[series_id] = {
                id: series_id,
                series_name: result["series_short_name"] as string,
                series_logo: result["series_logo"] as string,
                license_category_id: result["license_category_id"] as number,
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
        series[series_id].laps_lead += result['laps_lead'] as number

    }

    let stats: statsType[] = []
    for (const i in series) {
        const singleSeries = series[i]

        // Incident average
        singleSeries.inc_avg = singleSeries.incidents / singleSeries.races

        // Finish average
        singleSeries.finish_avg = singleSeries.finish_total / singleSeries.races

        stats.push(singleSeries)
    }

    // @ts-ignore
    stats.sort((a,b) => (a.races < b.races) ? 1 : ((b.races < a.races) ? -1 : 0));
    console.log("stats:", stats)

    return stats
}
