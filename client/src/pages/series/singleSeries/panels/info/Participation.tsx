import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import StatCard from "../../../../../components/data/StatCard.tsx";

export default function Participation() {
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

       <Grid container spacing={1}>
           <StatCard elevation={3} name={'sessions'} value={'hello'}/>
           <StatCard elevation={3} name={'splits'} value={'hello'}/>
           <StatCard elevation={3} name={'participants'} value={'hello'}/>
       </Grid>
    </Paper>
}
