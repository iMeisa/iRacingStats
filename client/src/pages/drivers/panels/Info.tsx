import Grid from "@mui/material/Unstable_Grid2";
import {Box, Divider, Paper, Stack,} from "@mui/material";
import Typography from "@mui/material/Typography";
import TrophyCabinet from "../TrophyCabinet.tsx";
import {DriverSummary} from "../../../models/driver/Driver.ts";
import {DriverRace} from "../../../models/driver/Race.ts";
import DriverLicenses from "./info/DriverLicenses.tsx";
import {RaceStats} from "./info/RaceStats.tsx";
import {DrivingStats} from "./info/DrivingStats.tsx";
import useIsMobile from "../../../hooks/useIsMobile.ts";

export type InfoProps = {
    user: DriverSummary,
    loading: boolean,
    driver_races: DriverRace[],
    data_loading: boolean,
}

export default function DriverInfo(props: InfoProps) {

    const isMobile = useIsMobile()

    return <>

        {/*Desktop*/}
        <Grid container spacing={ isMobile ? 0 : 2 } mx={'auto'}>
            <Grid md={12} lg={6} mx={'auto'}>
                <Stack spacing={2}>

                    <Paper className={"stat-border info"} sx={{ p: 1 }}>

                        <Typography variant="subtitle1" pb={0.5} fontWeight="bold">
                            Licenses
                        </Typography>

                        <DriverLicenses loading={props.loading} licenses={props.user.licenses}/>
                    </Paper>

                    <Paper className={"stat-border race-stats"} sx={{ p: 1 }}>

                        <Typography variant="subtitle1" pb={0.5} fontWeight="bold">
                            Race Stats
                        </Typography>

                        <RaceStats results={props.driver_races} loading={props.data_loading}/>
                    </Paper>

                    <Paper className={"stat-border driving-stats"} sx={{ p: 1 }}>

                        <Typography variant="subtitle1" pb={0.5} fontWeight="bold">
                            Driving Stats
                        </Typography>

                        <DrivingStats results={props.driver_races} loading={props.data_loading}/>
                    </Paper>

                </Stack>
            </Grid>

            <Grid md={12} lg={6} sx={{mb: 2}} display={'block'} mx={'auto'}>

                <Divider sx={{ mt: 1, mb: 2, display: { md: 'block', lg: 'none' }}} />

                <Box className={"stat-border trophies"}>
                    <TrophyCabinet loading={props.data_loading} driverRaces={props.driver_races}/>
                </Box>
            </Grid>
        </Grid>
    </>
}
