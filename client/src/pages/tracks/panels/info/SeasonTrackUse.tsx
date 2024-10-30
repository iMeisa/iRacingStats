import {CircularProgress, Paper, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import SeriesLogo from "../../../../components/images/SeriesLogo.tsx";
import {SeriesById} from "../../../../cache/CachesById.ts";
import {Season} from "../../../../models/Season.ts";
import useWindowSize from "../../../../hooks/useWindowSize.ts";
import {useEffect, useState} from "react";
import './TrackUse.css'

type SeasonTrackUseProps = {
    loading: boolean;
    trackUses: Season[];
}

export default function SeasonTrackUse(props: SeasonTrackUseProps) {

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
                            <Link to={`/series/${use.series_id}`}>
                                <Paper
                                    elevation={2}
                                    sx={{
                                        paddingY: 1,
                                        "&:hover": { boxShadow: 6 },
                                    }}
                                    >

                                    <Box display='flex' mx={2} my={1}>

                                        <SeriesLogo width={90} height={90} link={SeriesById()[use.series_id].series_logo}/>

                                        <Box ml={2} display='flex' alignItems={'center'} textAlign={'center'}>
                                            {use.season_year} Season {use.season_quarter} - Week {use.race_week_num}
                                        </Box>
                                    </Box>
                                </Paper>
                            </Link>
                        )}

                    </Stack>

                }

            </Box>
        </Paper>
    </>
}
