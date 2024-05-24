import {CircularProgress, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import StatCard from "../../../../../components/data/StatCard.tsx";
import {Session} from "../../../../../models/Session.ts";
import {DefaultSeason, Season} from "../../../../../models/Season.ts";
import Box from "@mui/material/Box";

type ParticipationProps = {
    races: Session[],
    races_loading: boolean,
    seasons: Season[],
    seasons_loading: boolean,
}

export default function Participation(props: ParticipationProps) {

    const latestSeason = props.seasons_loading ? DefaultSeason : props.seasons[0]

    const sessions = props.races_loading ? 0 : props.races.length
    let splits: number = 0
    let entries: number = 0
    let week: number = 0

    if (!props.races_loading) {
        props.races.map(race => {
            splits += race.subsession_count
            entries += race.entry_count
        })

        week = props.races[0].race_week_num
    }

    return <Paper
        elevation={1}
        sx={{
            marginX: 1,
            padding: 1,

            border: '2px solid goldenrod',
            borderRadius: '1em',
        }}
    >
        <Box display='flex' justifyContent='center' alignItems='end' mb={1}>
            <Typography
                variant="h6"
                fontWeight="bold"
                lineHeight={1.2}
                fontFamily={'Verdana'}
            >
                Participation
            </Typography>

            { props.races_loading ? <></> :
                <>
                    <Typography
                        ml={2}
                        color='darkgrey'
                        lineHeight={1.2}
                    >
                        {latestSeason.season_year} S{latestSeason.season_quarter}
                    </Typography>

                    { week === undefined ? <></> :
                        <Typography
                            ml={2}
                            color='darkgrey'
                            lineHeight={1.2}
                        >
                            Week {week}
                        </Typography>
                    }
                </>
            }
        </Box>

        { props.races_loading ? <CircularProgress/> :
            <Grid container spacing={1}>
                <StatCard elevation={3} md={4} lg={4} name={'Sessions'} value={sessions}/>
                <StatCard elevation={3} md={4} lg={4} name={'Splits'} value={splits}/>
                <StatCard elevation={3} md={4} lg={4} name={'Entries'} value={entries}/>
            </Grid>
        }
    </Paper>
}
