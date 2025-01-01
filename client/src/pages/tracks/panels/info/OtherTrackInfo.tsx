import {Track as TrackModel} from "../../../../models/Track.ts";
import Grid from "@mui/material/Unstable_Grid2";
import StatCard from "../../../../components/data/StatCard.tsx";
import {UnixToDate} from "../../../../functions/datetime/UnixToDate.ts";
import {TrackInfoModel} from "../../TrackInfo.ts";

type OtherTrackInfoProps = {
    track: TrackModel
    info: TrackInfoModel
}
export default function OtherTrackInfo(props: OtherTrackInfoProps) {

    const yearLength = 31_556_926

    // const owners = props.info.trackOwners.toLocaleString()
    const firstRace = props.info.trackFirstRace < 1 ? 'N/A' : UnixToDate(props.info.trackFirstRace)
    const firstRaceAccurate = (props.info.trackFirstRace - props.track.created) > yearLength

    return <>
        <Grid container spacing={1}>
            <StatCard elevation={3} xs={6} sm={6} md={6} lg={6} name="Created" value={UnixToDate(props.track.created)}/>
            {/*<StatCard elevation={3} md={4} lg={4} name="Owners" value={owners} tooltip={'Drivers who have raced this track (all configurations)'}/>*/}
            <StatCard
                elevation={3} xs={6} sm={6} md={6} lg={6}
                name="First Raced"
                tooltip={firstRaceAccurate ? 'May be inaccurate' : ''}
                tooltipType={'warning'}
                value={firstRace}
            />
            <StatCard elevation={3} xs={12} sm={12} md={12} lg={12} name="Location" value={props.track.location}/>
            {/*<StatCard elevation={3} md={4} lg={4} name="idk" value={'idk'}/>*/}
            {/*<StatCard elevation={3} md={4} lg={4} name="idk" value={'idk'}/>*/}
            {/*<StatCard elevation={3} md={4} lg={4} name="idk" value={'idk'} />*/}
        </Grid>
    </>
}
