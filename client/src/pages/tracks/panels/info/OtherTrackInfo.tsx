import {Track as TrackModel} from "../../../../models/Track.ts";
import Grid from "@mui/material/Unstable_Grid2";
import StatCard from "../../../../components/data/StatCard.tsx";
import {UnixToDate} from "../../../../functions/datetime/UnixToDate.ts";

type OtherTrackInfoProps = {
    track: TrackModel
}
export default function OtherTrackInfo(props: OtherTrackInfoProps) {

    return <>
        <Grid container spacing={1}>
            <StatCard elevation={3} md={4} lg={4} name="Created" value={UnixToDate(props.track.created)}/>
            <StatCard elevation={3} md={4} lg={4} name="Owners" value={'idk'} tooltip={'Drivers who have raced this track (all configurations)'}/>
            <StatCard elevation={3} md={4} lg={4} name="First Raced" value={'idk'}/>
            <StatCard elevation={3} md={4} lg={4} name="idk" value={'idk'}/>
            <StatCard elevation={3} md={4} lg={4} name="idk" value={'idk'}/>
            <StatCard elevation={3} md={4} lg={4} name="idk" value={'idk'} />
        </Grid>
    </>
}
