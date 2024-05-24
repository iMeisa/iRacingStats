import {CircularProgress, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import StatCard from "../../../../../components/data/StatCard.tsx";
import {Session} from "../../../../../models/Session.ts";

type ParticipationProps = {
    races: Session[],
    loading: boolean,
}

export default function Participation(props: ParticipationProps) {

    const sessions = props.loading ? 0 : props.races.length
    let splits: number = 0
    let entries: number = 0

    if (!props.loading) {
        props.races.map(race => {
            splits += race.subsession_count
            entries += race.entry_count
        })
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
        <Typography
            variant="h6"
            fontWeight="bold"
            lineHeight={1.2}
            fontFamily={'Verdana'}
            mb={1}
        >
            Participation
        </Typography>

        { props.loading ? <CircularProgress/> :
            <Grid container spacing={1}>
                <StatCard elevation={3} md={4} lg={4} name={'Sessions'} value={sessions}/>
                <StatCard elevation={3} md={4} lg={4} name={'Splits'} value={splits}/>
                <StatCard elevation={3} md={4} lg={4} name={'Entries'} value={entries}/>
            </Grid>
        }
    </Paper>
}
