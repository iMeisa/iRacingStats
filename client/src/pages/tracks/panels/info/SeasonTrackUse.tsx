import {CircularProgress, Paper, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import SeriesLogo from "../../../../components/images/SeriesLogo.tsx";
import {SeriesById} from "../../../../cache/CachesById.ts";
import {Season} from "../../../../models/Season.ts";
import useWindowSize from "../../../../hooks/useWindowSize.ts";
import './TrackUse.css'
import useIsMobile from "../../../../hooks/useIsMobile.ts";

type SeasonTrackUseProps = {
    loading: boolean;
    trackUses: Season[];
}

export default function SeasonTrackUse(props: SeasonTrackUseProps) {

    const [_width, height] = useWindowSize()
    const isMobile = useIsMobile()

    return <>
        <Paper
            className={'stat-border list-color'}
            elevation={1}
            sx={{
                maxHeight: height * 0.7,
                padding: 1,
                marginLeft: isMobile ? 0 : 1,

                overflowY: 'auto',
            }}
        >
            <Typography variant="h6" fontWeight="bold" lineHeight={1.2}>Series This Season</Typography>

            {/*Center while loading*/}
            <Box mt={1} display={props.loading ? 'flex' : 'block'} justifyContent={'center'}>

                { props.loading ?
                    <CircularProgress/> :

                    props.trackUses.length < 1 ?
                        <Typography variant={'subtitle1'}>Not used</Typography> :
                        <Stack spacing={1}>

                            {props.trackUses.map((use) =>
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
                                                {use.season_year} Season {use.season_quarter} - Week {use.race_week_num+1}
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
