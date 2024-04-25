import {Paper, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";

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
