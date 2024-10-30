import {Track as TrackModel} from "../../../../models/Track.ts";
import Grid from "@mui/material/Unstable_Grid2";
import StatCard from "../../../../components/data/StatCard.tsx";
import BoolIcon from "../../../../components/data/BoolIcon.tsx";

type GeneralTrackInfoProps = {
    track: TrackModel
}
export default function GeneralTrackInfo(props: GeneralTrackInfoProps) {

    const banking = props.track.banking ? props.track.banking.replace(/&#176;/g, '°') : 'N/A';

    let length_km = props.track.track_config_length ? (Math.round(props.track.track_config_length * 1.609 * 100) / 100).toFixed(2) : 0;
    length_km = `${length_km} km`;

    const length_mi = `${props.track.track_config_length} mi`;

    const length_main = props.track.is_oval ? length_mi : length_km;
    const length_secondary = props.track.is_oval ? length_km : length_mi

    return <>
        <Grid container spacing={1}>
            <StatCard elevation={5} sm={2} md={4} name="Track ID" value={props.track.track_id}/>
            <StatCard elevation={3} sm={2} md={4} name="Corners" value={props.track.corners_per_lap}/>
            <StatCard elevation={3} sm={2} md={4} name="Length" value={length_main} tooltip={length_secondary}/>
            <StatCard elevation={3} sm={2} md={4} name="Max Cars" value={props.track.max_cars}/>
            <StatCard elevation={3} sm={2} md={4} name="Lighting" value={<BoolIcon value={props.track.night_lighting} positiveValue={true} />}/>
            <StatCard elevation={3} sm={2} md={4} name="Banking" value={banking} />
        </Grid>
    </>
}
