import Grid from "@mui/material/Unstable_Grid2";
import InfoCard from "../../../components/data/InfoCard.tsx";
import LapTime from "../../../functions/datetime/LapTime.ts";
import {Subsession} from "../../../models/Subsession.ts";

export default function SubsessionInfo(props: {subsession: Subsession}) {
    return <Grid container mt={2} spacing={2}>
        <InfoCard title="Average Lap" info={LapTime(props.subsession.event_average_lap)}/>
        <InfoCard title="Laps Completed" info={props.subsession.event_laps_complete}/>
        <InfoCard title="Cautions" info={props.subsession.num_cautions}/>
        <InfoCard title="Lead Changes" info={props.subsession.num_lead_changes}/>
        <InfoCard title="Strength of Field" info={props.subsession.event_strength_of_field}/>
        <InfoCard title="Caution Laps" info={props.subsession.num_caution_laps}/>
    </Grid>
}
