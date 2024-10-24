import {Track} from "../../../models/Track.ts";
import Grid from "@mui/material/Unstable_Grid2";
import {CircularProgress, Paper, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import useWindowSize from "../../../hooks/useWindowSize.ts";
import GeneralTrackInfo from "./info/GeneralTrackInfo.tsx";
import OtherTrackInfo from "./info/OtherTrackInfo.tsx";
import {Season} from "../../../models/Season.ts";
import {useEffect} from "react";
import Box from "@mui/material/Box";
import SeriesLogo from "../../../components/images/SeriesLogo.tsx";

type TrackInfoProps = {
    track: Track
    trackUses: Season[]
    loading: boolean
}

export default function TrackInfo(props: TrackInfoProps) {
    const [_width, height] = useWindowSize()

    let trackUses = props.trackUses

    useEffect(() => {
        trackUses.sort((a, b) => (a.series_id < b.series_id) ? -1 : (b.series_id < a.series_id) ? 1 : 0)
        trackUses.sort((a, b) => (a.season_quarter < b.season_quarter) ? -1 : (b.season_quarter < a.season_quarter) ? 1 : 0)
        trackUses.sort((a, b) => (a.season_year < b.season_year) ? -1 : (b.season_year < a.season_year) ? 1 : 0)
        trackUses.sort((a, b) => (a.race_week_num < b.race_week_num) ? -1 : (b.race_week_num < a.race_week_num) ? 1 : 0)
    }, [props.loading])

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
                <Paper
                    className={'stat-border list-color'}
                    elevation={1}
                    sx={{
                        maxHeight: height * 0.7,
                        padding: 1,
                        marginX: 1,

                        overflowY: 'auto',
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" lineHeight={1.2} fontFamily={'Verdana'}>Series This Season</Typography>

                    {/*{singleCar() ? "single car" : "many cars"}*/}
                    <Grid container>
                        {/*Padding for single car*/}

                        { props.loading ?
                            <CircularProgress/> :
                            // <>{props.trackUses}</>
                            <Stack>
                            {trackUses.map((use) =>
                                <Box>
                                    { use.series_id } { use.race_week_num }
                                </Box>
                            )}
                            </Stack>

                        }

                    </Grid>
                </Paper>
            </Grid>

        </Grid>
    </>
}
