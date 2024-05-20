import {DriverSummary} from "../../models/driver/Driver.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ClubLogo from "../../components/images/ClubLogo.tsx";
import useDataRange from "../../hooks/useDataRange.ts";
import {Paper, Tooltip} from "@mui/material";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import UnixTimeAgo from "../../components/data/UnixTimeAgo.tsx";
import GetBreakpoints from "../../functions/data/Breakpoints.ts";

export default function DriverTitle(props: {driver: DriverSummary, loading: boolean}) {

    const joinDay = new Date(props.driver.member_since * 1000).toDateString()

    const [dataRange, loading] = useDataRange()

    const breakpoints = GetBreakpoints()

    return <Box my={2} display={ breakpoints.md ? 'flex' : 'block' } alignItems='center'>

        <Box display='flex' justifyContent='center' alignItems='center'>
            <Typography mr={2} variant="h5" fontWeight="bold" fontFamily='Verdana'>{props.driver.name}</Typography>
            <DriverStatus mobile={!breakpoints.md} loading={loading} minDataRange={dataRange.min} member_since={props.driver.member_since}/>
        </Box>


        <Box mt={ breakpoints.md ? 0 : 1 } mr={2} display={'flex'} justifyContent='center' alignItems='center'>
            <ClubLogo id={props.driver.club_id} clubName={props.driver.club_name}/>

            <Tooltip title={joinDay}>
                <Paper
                    elevation={3}
                    sx={{
                        marginLeft: 2,
                        paddingY: 1,
                        paddingX: 2,
                        borderRadius: '10em',
                    }}
                >
                    <Box display='flex'>
                        <Typography fontWeight='bold' mr={1}>Member since:</Typography>
                        <UnixTimeAgo tooltip={false} unixStamp={props.driver.member_since}/>
                    </Box>
                </Paper>
            </Tooltip>
        </Box>

        <DriverStatus
            mobile={breakpoints.md}
            loading={loading}
            minDataRange={dataRange.min}
            member_since={props.driver.member_since}
        />
    </Box>
}

type DriverStatusProps = {
    mobile: boolean,
    loading: boolean,
    minDataRange: number,
    member_since: number,
}

function DriverStatus(props: DriverStatusProps) {
    return <Box
        ml={ props.mobile ? 0 : 2 }
        display={ props.mobile ? 'flex' : 'none'}
        alignItems='center'
    >
        {!props.loading && props.minDataRange <= props.member_since ?
            <Tooltip title="irstats should have all driver's data">
                <DoneOutlineIcon color='success'/>
            </Tooltip> :
            <Tooltip title="irstats doesn't have all driver's data yet">
                <WarningAmberIcon color='warning'/>
            </Tooltip>
        }
    </Box>
}
