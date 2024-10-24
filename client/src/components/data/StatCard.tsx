import {Paper, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import "./StatBox.css";

type StatCardProps = {
    elevation: number,
    tooltip?: string,
    name: string,
    value: any,

    xs?: number,
    md?: number,
    lg?: number,
}

export default function StatCard(props: StatCardProps) {

    const tooltip = props.tooltip ? props.tooltip : ''

    const xs = props.xs ? props.xs : 4
    const md = props.md ? props.md : 2
    const lg = props.lg ? props.lg : 2

    return (
        <Grid xs={xs} md={md} lg={lg}>
            <Tooltip placement="top" title={tooltip} arrow>
                <Paper elevation={props.elevation} sx={{ p: 1, height: '5em' }}>

                    <Box
                        display="flex"
                        justifyContent="center"
                        flexDirection="row"
                        alignItems="center"
                        textAlign="center"
                        height="2.2em"
                    >
                        <Typography variant="subtitle2" fontWeight="bold" lineHeight={1.2}>{props.name}</Typography>
                    </Box>

                    <Typography variant="subtitle1">{props.value}</Typography>

                </Paper>
            </Tooltip>
        </Grid>
    )
}
