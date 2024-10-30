import {Track} from "../../../models/Track.ts";
import Grid from "@mui/material/Unstable_Grid2";
import {Paper, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import GeneralTrackInfo from "./info/GeneralTrackInfo.tsx";
import OtherTrackInfo from "./info/OtherTrackInfo.tsx";
import {Season} from "../../../models/Season.ts";
import SeasonTrackUse from "./info/SeasonTrackUse.tsx";
import TrackMap from "../../../components/images/TrackMap.tsx";
import useWindowSize from "../../../hooks/useWindowSize.ts";
import GetBreakpoints from "../../../functions/data/Breakpoints.ts";

type TrackInfoProps = {
    track: Track
    trackUses: Season[]
    loading: boolean
    trackOwners: number
}

export default function TrackInfo(props: TrackInfoProps) {

    const [width, _height] = useWindowSize()
    const trackSize = GetBreakpoints().md ? '13em' : width / 2

    return <>
        <Grid container width="100%" mx="auto" mt={2}>

            <Grid xs={12} md={6}>
                <Stack spacing={2} height='100%'>

                    <Paper className={'stat-border '} sx={{ p: 1 }}>
                        <Typography variant="subtitle1" pb={0.5} fontWeight="bold">
                            Track Map
                        </Typography>

                        <TrackMap id={props.track.track_id} minimal size={trackSize}/>
                    </Paper>

                    <Paper className={"stat-border info"} sx={{ p: 1 }}>

                        <Typography variant="subtitle1" pb={0.5} fontWeight="bold">
                            General
                        </Typography>

                        <GeneralTrackInfo track={props.track}/>
                    </Paper>

                    <Paper className={"stat-border race-stats"} sx={{ p: 1 }}>

                        <Typography variant="subtitle1" pb={0.5} fontWeight="bold">
                            Other
                        </Typography>

                        <OtherTrackInfo track={props.track} owners={props.trackOwners}/>
                    </Paper>
                </Stack>
            </Grid>

            <Grid mt={{ xs: 2, md: 0 }} xs={12} md={6}>
                <SeasonTrackUse loading={props.loading} trackUses={props.trackUses}/>
            </Grid>

        </Grid>
    </>
}
