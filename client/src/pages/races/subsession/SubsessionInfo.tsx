import Grid from "@mui/material/Unstable_Grid2";
// import InfoCard from "../../../components/data/InfoCard.tsx";
import LapTime from "../../../functions/datetime/LapTime.ts";
import {Subsession} from "../../../models/Subsession.ts";
import StatCard from "../../../components/data/StatCard.tsx";

export default function SubsessionInfo(props: {subsession: Subsession}) {
    return <Grid container mt={2} spacing={2}>
        <StatCard elevation={5} name="Average Lap" value={LapTime(props.subsession.event_average_lap)}/>
        <StatCard elevation={5} name="Laps Completed" value={props.subsession.event_laps_complete}/>
        <StatCard elevation={5} name="Cautions" value={props.subsession.num_cautions}/>
        <StatCard elevation={5} name="Lead Changes" value={props.subsession.num_lead_changes}/>
        <StatCard elevation={5} name="Strength of Field" value={props.subsession.event_strength_of_field}/>
        <StatCard elevation={5} name="Caution Laps" value={props.subsession.num_caution_laps}/>
    </Grid>
}
