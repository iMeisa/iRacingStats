import {DefaultSession, Session} from "../../../../../models/Session.ts";
import {CircularProgress, Paper, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CategoryLogo from "../../../../../functions/img/CategoryLogo.tsx";
import UnixTimeAgo from "../../../../../components/data/UnixTimeAgo.tsx";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import GetBreakpoints from "../../../../../functions/data/Breakpoints.ts";

type RecentRaceProps = {
    races: Session[],
    races_loading: boolean,
}

export default function RecentRace(props: RecentRaceProps) {

    props.races.sort((a, b) => b.session_id - a.session_id)
    const latestRace = props.races_loading ? DefaultSession : props.races[0]

    let vertical = false

    const breakpoints = GetBreakpoints()
    if (breakpoints.lg) vertical = false
    else if (breakpoints.xs) vertical = true

    // if (props.races_loading) return <CircularProgress/>

    return <>
        <Paper
            elevation={3}
            sx={{
                marginX: 1,
                padding: 1,

                border: '2px solid turquoise',
                borderRadius: '1em',
            }}
        >
            <Typography
                variant="h6"
                fontWeight="bold"
                lineHeight={1.2}
                fontFamily={'Verdana'}
            >
                Most Recent Race
            </Typography>

            {props.races_loading ? <CircularProgress/> :
                <Paper
                    elevation={5}
                    sx={{
                        marginTop: 1,
                        padding: 1,
                    }}
                >

                    <RaceDisplay vertical={vertical} session={latestRace} sessions_loading={props.races_loading}/>

                </Paper>
            }

        </Paper>
    </>
}

type RaceProps = {
    vertical: boolean,
    session: Session,
    sessions_loading: boolean
}

function RaceDisplay(props: RaceProps) {
    return <>
         <Box display={ props.vertical ? 'block' : 'flex' } justifyContent='space-between' alignItems='center'>

             <Box mr={ props.vertical ? 0 : 1 } my={ props.vertical ? -1 : 0}>
                 {CategoryLogo(props.session.category_id, props.session.min_license_level, 50)}
             </Box>

             <Stack width='100%'>
                 <Box
                     mx='auto'
                     mb={1}
                     display='flex'
                     justifyContent='space-around'
                     alignItems='center'
                     width='80%'
                 >
                     <UnixTimeAgo unixStamp={props.session.end_time}/>
                     <Typography sx={{marginLeft: 1}}>Splits: {props.session.subsession_count}</Typography>
                 </Box>

                 <Box display='flex' mx={'auto'} mt={0}>
                     <Typography fontWeight='bold'>{props.session.track}</Typography>
                 </Box>
             </Stack>

             <Box ml={ props.vertical ? 0 : 1 } mt={props.vertical ? 2 : 0}>
                 <Link to={`/sessions/${props.session.session_id}`}>
                     <Button variant="contained" size="small" startIcon={<FormatListNumberedIcon/>}>Results</Button>
                 </Link>
             </Box>
         </Box>
    </>
}
