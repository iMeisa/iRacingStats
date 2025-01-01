import {Paper, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import "./StatBox.css";
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

type TooltipType = undefined | 'info' | 'warning'

type StatCardProps = {
    elevation: number,
    tooltip?: string,
    tooltipType?: TooltipType
    name: string,
    value: any,

    xs?: number,
    sm?: number,
    md?: number,
    lg?: number,
}

type TooltipIconProps = {
    tooltipType: TooltipType
}
function TooltipIcon (props: TooltipIconProps){
    switch (props.tooltipType) {
        case 'warning': {
            return <WarningIcon color={'warning'} fontSize={'small'}/>
        }
        default: {
            return <InfoIcon fontSize={'small'} />
        }
    }
}

export default function StatCard(props: StatCardProps) {

    const tooltip = props.tooltip ? props.tooltip : ''

    const xs = props.xs || 4
    const sm = props.sm || 4
    const md = props.md || 2
    const lg = props.lg || 2

    return (
        <Grid xs={xs} sm={sm} md={md} lg={lg}>
            <Tooltip placement="top" title={tooltip} arrow>
                <Paper elevation={props.elevation} sx={{ p: 1, height: '5em' }}>

                    <Box position={'relative'} display={ tooltip ? 'block' : 'none' }>
                        <Box position={'absolute'} right={-5} top={-5}>
                            <TooltipIcon tooltipType={props.tooltipType}/>
                        </Box>
                    </Box>

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
