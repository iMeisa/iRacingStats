import {Track} from "../../../models/Track.ts";
import Grid from "@mui/material/Unstable_Grid2";
import {CircularProgress, Paper, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import useWindowSize from "../../../hooks/useWindowSize.ts";
import GeneralTrackInfo from "./info/GeneralTrackInfo.tsx";
import OtherTrackInfo from "./info/OtherTrackInfo.tsx";
import {Season} from "../../../models/Season.ts";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import SeriesLogo from "../../../components/images/SeriesLogo.tsx";
import {SeriesById} from "../../../cache/CachesById.ts";
import {Link} from "react-router-dom";

type TrackInfoProps = {
    track: Track
    trackUses: Season[]
    loading: boolean
}

export default function TrackInfo(props: TrackInfoProps) {
    const [_width, height] = useWindowSize()

    const [trackUses, setTrackUses] = useState<Season[]>([])

    // Sort track uses by race week on load
    useEffect(() => {

        if (props.loading) return

        props.trackUses.sort((a, b) => (a.series_id < b.series_id) ? -1 : (b.series_id < a.series_id) ? 1 : 0)
        props.trackUses.sort((a, b) => (a.season_quarter < b.season_quarter) ? -1 : (b.season_quarter < a.season_quarter) ? 1 : 0)
        props.trackUses.sort((a, b) => (a.season_year < b.season_year) ? -1 : (b.season_year < a.season_year) ? 1 : 0)
        props.trackUses.sort((a, b) => (a.race_week_num < b.race_week_num) ? -1 : (b.race_week_num < a.race_week_num) ? 1 : 0)

        setTrackUses(props.trackUses)
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

                    {/*Center while loading*/}
                    <Box mt={1} display={props.loading ? 'flex' : 'block'} justifyContent={'center'}>

                        { props.loading ?
                            <CircularProgress/> :

                            <Stack spacing={1}>

                            {trackUses.map((use) =>
                                <Paper elevation={2}>
                                    <Box display='flex' mx={2} my={1}>

                                        <Link to={`/series/${use.series_id}`}>
                                            <SeriesLogo width={90} height={90} link={SeriesById()[use.series_id].series_logo}/>
                                        </Link>

                                        <Box ml={2} display='flex' alignItems={'center'} textAlign={'center'}>
                                            {use.season_year} Season {use.season_quarter} - Week {use.race_week_num}
                                        </Box>
                                    </Box>
                                </Paper>
                            )}

                            </Stack>

                        }

                    </Box>
                </Paper>
            </Grid>

        </Grid>
    </>
}
