import {DriverRace} from "../../../../models/driver/Race.ts";
import {CircularProgress} from "@mui/material";
import ElapsedTime from "../../../../functions/datetime/ElapsedTime.ts";
import Percentage from "../../../../functions/strings/Percentage.ts";
import Grid from "@mui/material/Unstable_Grid2";
import StatCard from "../../../../components/data/StatCard.tsx";

export function RaceStats(props: { results: DriverRace[], loading: boolean }) {

    if (props.loading) return <CircularProgress size="2em"/>

    const race_count = props.results.length
    let total_time = 0
    let podiums = 0
    let laps_lead = 0
    let races_finished = 0
    let incidents = 0

    props.results.map(result => {
        if (result.valid_race && result.finish_position_in_class < 3) podiums++
        total_time += result.laps_complete * result.average_lap
        laps_lead += result.laps_lead
        if (result.reason_out_id === 0) races_finished++
        incidents += result.incidents
    })

    const race_time = ElapsedTime(total_time / 10)
    const finish_percentage = Percentage(races_finished, race_count)
    const incident_avg = (incidents / race_count).toFixed(2)

    return (
        <Grid container spacing={1}>
            <StatCard elevation={5} name="Races" value={race_count}/>
            <StatCard elevation={3} name="Podiums" value={podiums}/>
            <StatCard elevation={3} name="Laps Lead" value={laps_lead}/>
            <StatCard elevation={3} name="Race Time" value={race_time} tooltip={"Total time spent driving in races"}/>
            <StatCard elevation={3} name="Finish %" value={finish_percentage} tooltip={"Percentage of races finished"}/>
            <StatCard elevation={3} name="Inc. Avg" value={incident_avg} tooltip={"Incident Average"}/>
        </Grid>
    )
}
