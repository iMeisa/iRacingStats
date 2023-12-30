import MinNonZero from "../../../functions/numbers/MinNonZero.ts";

type statsType = {
    id: number,
    track_name: string,
    track_logo: string,
    license_category_id: number,
    races: number,
    wins: number,
    podiums: number,
    race_time: number,
    best_avg: number,
    lap_record: number,
    incidents: number,
    inc_avg: number,
    finish_total: number,  // Divide this by number of races to get average finish position
    laps: number,
    laps_lead: number,
    distance_mi: number,
    distance_km: number,
}

export default function TrackStats(results: Record<string, unknown>[]): Record<string, unknown>[] {


    let tracks: Record<number, statsType> = {}

    for (const i in results) {
        const result = results[i]
        const track_id = result['track_id'] as number

        const average_lap = result['average_lap'] as number
        const laps_complete = result['laps_complete'] as number
        const best_lap = result['best_lap_time'] as number
        const incidents = result['incidents'] as number
        const finish_pos = result['finish_position_in_class'] as number
        const valid_result = result['valid_race'] as boolean

        // Initial declaration
        if (!( track_id in tracks )) {
            tracks[track_id] = {
                id: track_id,
                track_name: result["track"] as string,
                track_logo: result["track_logo"] as string,
                license_category_id: result["license_category_id"] as number,
                races: 0,
                wins: 0,
                podiums: 0,
                race_time: 0,
                best_avg: -1,
                lap_record: -1,
                incidents: 0,
                inc_avg: 0,
                finish_total: 0,  // Divide this by number of races to get average finish position
                laps: 0,
                laps_lead: 0,
                distance_mi: 0,
                distance_km: 0,
            }
        }

        // Races
        tracks[track_id].races++
        // Wins
        if ( finish_pos == 0 && valid_result ) tracks[track_id].wins++
        // Podiums
        if ( finish_pos < 3 && valid_result ) tracks[track_id].podiums++
        // Race Time
        tracks[track_id].race_time += laps_complete * average_lap
        // Average Lap
        tracks[track_id].best_avg = MinNonZero(tracks[track_id].best_avg, average_lap)
        // Lap Record
        tracks[track_id].lap_record = MinNonZero(tracks[track_id].lap_record, best_lap)
        // Incidents
        tracks[track_id].incidents += incidents
        // Finish Total
        tracks[track_id].finish_total += finish_pos
        // Laps
        tracks[track_id].laps += laps_complete
        // Laps Lead
        tracks[track_id].laps_lead += result['laps_lead'] as number
        // Distance Driven
        tracks[track_id].distance_mi += Math.round(result['track_config_length'] as number * laps_complete)

    }

    console.log("tracks:", tracks)

    let stats: statsType[] = []
    for (const i in tracks) {
        const track = tracks[i]
        // Add km distance
        track.distance_km = Math.round(track.distance_mi * 1.609)

        // Incident average
        track.inc_avg = track.incidents / track.races
        stats.push(track)
    }

    // @ts-ignore
    stats.sort((a,b) => (a.races < b.races) ? 1 : ((b.races < a.races) ? -1 : 0));
    console.log("stats:", stats)

    return stats
}
