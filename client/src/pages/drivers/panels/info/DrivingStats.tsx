import {DriverRace} from "../../../../models/driver/Race.ts";
import {CircularProgress} from "@mui/material";
import FormatCompactNumber from "../../../../functions/numbers/FormatCompactNumber.ts";
import Grid from "@mui/material/Unstable_Grid2";
import StatCard from "../../../../components/data/StatCard.tsx";

export function DrivingStats(props: { results: DriverRace[], loading: boolean }) {

    if (props.loading) return <CircularProgress size="2em"/>
    let laps = 0

    let cars_driven: number[] = []
    let tracks_driven: number[] = []
    let series_driven: number[] = []
    let mi_driven = 0
    let combos_driven: string[] = []

    props.results.map(result => {
        laps += result.laps_complete

        cars_driven.push(result.car_id)
        tracks_driven.push(result.track_id)
        series_driven.push(result.series_id)
        mi_driven += result.track_config_length * result.laps_complete
        combos_driven.push(`${result.car_id}-${result.track_id}`)
    })

    // Get all unique ids
    cars_driven = [...new Set(cars_driven)]
    tracks_driven = [...new Set(tracks_driven)]
    series_driven = [...new Set(series_driven)]
    combos_driven = [...new Set(combos_driven)]

    const km_driven = FormatCompactNumber(Math.ceil(mi_driven * 1.609))

    return (
        <Grid container spacing={1}>
            <StatCard elevation={3} name="Cars Driven" value={cars_driven.length}/>
            <StatCard elevation={3} name="Tracks Driven" value={tracks_driven.length}/>
            <StatCard elevation={3} name="Series' Driven" value={series_driven.length}/>
            <StatCard elevation={3} name="Distance Driven" value={`${km_driven} km`}
                      tooltip={`${FormatCompactNumber(mi_driven)} mi`}/>
            <StatCard elevation={3} name="Laps Driven" value={laps}/>
            <StatCard elevation={3} name="Combos Driven" value={combos_driven.length}
                      tooltip="Car and track combinations"/>
        </Grid>
    )
}
