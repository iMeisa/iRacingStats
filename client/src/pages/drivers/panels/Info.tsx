import Grid from "@mui/material/Unstable_Grid2";
import {
    Box, CircularProgress,
    Divider,
    Paper,
    Stack,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import TrophyCabinet from "../TrophyCabinet.tsx";
import {DriverSummary} from "../../../models/driver/Driver.ts";
import ElapsedTime from "../../../functions/datetime/ElapsedTime.ts";
import Percentage from "../../../functions/strings/Percentage.ts";
import StatCard from "../../../components/data/StatCard.tsx";
import FormatCompactNumber from "../../../functions/numbers/FormatCompactNumber.ts";
import {DriverRace} from "../../../models/driver/Race.ts";
import DriverLicenses from "./info/DriverLicenses.tsx";

export type InfoProps = {
    user: DriverSummary,
    loading: boolean,
    driver_races: DriverRace[],
    data_loading: boolean,
}

export default function DriverInfo(props: InfoProps) {

    return <>

        {/*Desktop*/}
        <Grid container spacing={2}>
            <Grid md={12} lg={6}>
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

            <Grid md={12} lg={6} sx={{mb: 2}}>

                <Divider sx={{ mt: 1, mb: 2, display: { md: 'block', lg: 'none' }}} />

                <Box className={"stat-border trophies"}>
                    {/*<Typography*/}
                    {/*    variant="subtitle1"*/}
                    {/*    sx={{ fontWeight: 'bold' }}*/}
                    {/*    position={'absolute'}*/}
                    {/*    zIndex={9}*/}
                    {/*    top={15}*/}
                    {/*    // left={'50%'}*/}
                    {/*    // right={'50%'}*/}
                    {/*>*/}
                    {/*    Trophy Cabinet*/}
                    {/*</Typography>*/}
                    <TrophyCabinet loading={props.data_loading} driverRaces={props.driver_races}/>
                </Box>
            </Grid>
        </Grid>
    </>
}

// function InfoCard(props: {user: DriverSummary, loading: boolean}) {
//     return <Paper elevation={3} sx={{ p: 1 }}>
//         <Stack
//             direction={{ xs: "column", md: "row" }}
//             justifyContent="space-evenly"
//             sx={{
//                 my: 'auto'
//             }}
//         >
//             <DriverLicenses loading={props.loading} licenses={props.user.licenses}/>
//         </Stack>
//     </Paper>
// }
//
// function Info(props: {user: DriverSummary, loading: boolean}) {
//     return props.loading ? <>
//         <Skeleton/>
//         <Skeleton/>
//     </> : <>
//         <Stack sx={{ mb: { xs: 1, md: 'auto' } }}>
//             <Typography variant="h6" component="h1" fontWeight="bold">
//                 {props.user.name}
//             </Typography>
//             <Grid>
//                 <ClubLogo id={props.user.club_id} clubName={props.user.club_name}/>
//             </Grid>
//         </Stack>
//     </>
// }

function RaceStats(props: {results: DriverRace[], loading: boolean}) {

    if (props.loading) return <CircularProgress size="2em"/>

    const race_count = props.results.length
    let total_time = 0
    let podiums = 0
    let laps_lead = 0
    let races_finished = 0
    let incidents = 0

    props.results.map(result => {
        if (result.valid_race && result.finish_position_in_class < 3) podiums++
        total_time += result.laps_complete * result.average_lap
        laps_lead += result.laps_lead
        if (result.reason_out_id === 0) races_finished++
        incidents += result.incidents
    })

    const race_time = ElapsedTime(total_time / 10)
    const finish_percentage = Percentage(races_finished, race_count)
    const incident_avg = (incidents / race_count).toFixed(2)

    return (
        <Grid container spacing={1}>
            <StatCard elevation={5} name="Races" value={race_count}/>
            <StatCard elevation={3} name="Podiums" value={podiums}/>
            <StatCard elevation={3} name="Laps Lead" value={laps_lead}/>
            <StatCard elevation={3} name="Race Time" value={race_time} tooltip={"Total time spent driving in races"}/>
            <StatCard elevation={3} name="Finish %" value={finish_percentage} tooltip={"Percentage of races finished"}/>
            <StatCard elevation={3} name="Inc. Avg" value={incident_avg} tooltip={"Incident Average"}/>
        </Grid>
    )
}

function DrivingStats(props: {results: DriverRace[], loading: boolean}) {

    if (props.loading) return <CircularProgress size="2em"/>
    let laps = 0

    let cars_driven: number[] = []
    let tracks_driven: number[] = []
    let series_driven: number[] = []
    let mi_driven = 0
    let combos_driven: string[] = []

    props.results.map(result => {
        laps += result.laps_complete

        cars_driven.push(result.car_id)
        tracks_driven.push(result.track_id)
        series_driven.push(result.series_id)
        mi_driven += result.track_config_length * result.laps_complete
        combos_driven.push(`${result.car_id}-${result.track_id}`)
    })

    // Get all unique ids
    cars_driven = [...new Set(cars_driven)]
    tracks_driven = [...new Set(tracks_driven)]
    series_driven = [...new Set(series_driven)]
    combos_driven = [...new Set(combos_driven)]

    const km_driven = FormatCompactNumber(Math.ceil(mi_driven * 1.609))

    return (
        <Grid container spacing={1}>
            <StatCard elevation={3} name="Cars Driven" value={cars_driven.length}/>
            <StatCard elevation={3} name="Tracks Driven" value={tracks_driven.length}/>
            <StatCard elevation={3} name="Series' Driven" value={series_driven.length}/>
            <StatCard elevation={3} name="Distance Driven" value={`${km_driven} km`} tooltip={`${FormatCompactNumber(mi_driven)} mi`}/>
            <StatCard elevation={3} name="Laps Driven" value={laps}/>
            <StatCard elevation={3} name="Combos Driven" value={combos_driven.length} tooltip="Car and track combinations"/>
        </Grid>
    )
}
