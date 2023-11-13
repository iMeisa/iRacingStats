import {Paper, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

type StatCardProps = {
    elevation: number,
    tooltip?: string,
    name: string,
    value: any,
}

export default function StatCard(props: StatCardProps) {

    const tooltip = props.tooltip ? props.tooltip : ''

    return (
        <Grid xs={4} md={2} lg={2}>
            <Tooltip placement="top" title={tooltip} arrow>
                <Paper elevation={props.elevation} sx={{ p: 1 }}>

                    <Typography variant="subtitle2" fontWeight="bold">{props.name}</Typography>
                    <Typography variant="subtitle1">{props.value}</Typography>

                </Paper>
            </Tooltip>
        </Grid>
    )
}
