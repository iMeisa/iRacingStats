import {Track} from "../../../models/Track.ts";
import Grid from "@mui/material/Unstable_Grid2";
import {Paper, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import GeneralTrackInfo from "./info/GeneralTrackInfo.tsx";
import OtherTrackInfo from "./info/OtherTrackInfo.tsx";
import {Season} from "../../../models/Season.ts";
import SeasonTrackUse from "./info/SeasonTrackUse.tsx";

type TrackInfoProps = {
    track: Track
    trackUses: Season[]
    loading: boolean
}

export default function TrackInfo(props: TrackInfoProps) {


    return <>
        <Grid container width="100%" mx="auto" mt={2}>

            <Grid xs={12} md={6}>
                <Stack spacing={2}>
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

                        <OtherTrackInfo track={props.track}/>
                    </Paper>
                </Stack>
            </Grid>

            <Grid mt={{ xs: 2, md: 0 }} xs={12} md={6}>
                <SeasonTrackUse loading={props.loading} trackUses={props.trackUses}/>
            </Grid>

        </Grid>
    </>
}
