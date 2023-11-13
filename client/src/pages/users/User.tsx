import useFetch from "../../hooks/useFetch.ts";
import {useParams} from "react-router-dom";
import {SyntheticEvent, useEffect, useState} from "react";
import Grid from '@mui/material/Unstable_Grid2';
import Container from "@mui/material/Container";
import "./User.css"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    CircularProgress, Divider,
    Paper,
    Skeleton,
    Stack,
    Tooltip
} from "@mui/material";
import RatingBadge from "../../components/data/RatingBadge.tsx";
import {User as UserModel, defaultUser, UserLicenses} from "./UserTypes.ts";
import TrophyCabinet from "./TrophyCabinet.tsx";
import ClubLogo from "../../components/images/ClubLogo.tsx";
import Typography from "@mui/material/Typography";
import DataRange from "../../functions/datetime/DataRange.ts";
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StatCard from "../../components/data/StatCard.tsx";
import ElapsedTime from "../../functions/datetime/ElapsedTime.ts";
import Percentage from "../../functions/strings/Percentage.ts";

export default function User() {
    const {id} = useParams()

    const [user, setUser] = useState(defaultUser)

    const [users, loading] = useFetch<UserModel>(`/api/user?cust_id=${id}`,
            (obj) => {
                // obj['id'] = obj['cust_id']
                return obj
            })

    const [results, results_loading] = useFetch(`/api/driver_results?id=${id}`)

    useEffect(() => {

        if (users.length > 0) setUser(users[0])

        console.log("users: ", users)
        console.log("results: ", results)
    }, [users, results]);


    const [expanded, setExpanded] = useState<string | false>('info');

    const handleChange =
        (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return <>
        {/*{user.id} {user.display_name} {String(loading)}*/}
        <Container maxWidth="xl">
            <Grid sx={{ display: {xs: 'none', md: 'flex'} }} container spacing={2} style={{ marginTop: '2em' }}>
                <Grid md={12} lg={6}>
                    <Stack spacing={2}>

                        <Paper className={"stat-border info"} sx={{ p: 1 }}>

                            <Typography variant="subtitle1" pb={0.5} fontWeight="bold">
                                Info
                            </Typography>

                            <InfoCard user={user} loading={loading}/>
                        </Paper>

                        <Paper className={"stat-border race-stats"} sx={{ p: 1 }}>

                            <Typography variant="subtitle1" pb={0.5} fontWeight="bold">
                                Race Stats
                            </Typography>

                            <RaceStats results={results} loading={results_loading}/>
                        </Paper>

                    </Stack>
                </Grid>

                <Grid md={12} lg={6} sx={{mb: 5}}>

                    <Divider sx={{ my: 1, display: { md: 'block', lg: 'none' }}} />

                    <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Trophy Cabinet
                        </Typography>
                        <Tooltip placement="top" arrow title={'Data range: ' + DataRange()}>
                            <InfoIcon/>
                        </Tooltip>
                    </Stack>
                    <Box className={"stat-border trophies"} >
                        <TrophyCabinet loading={results_loading} results={results}/>
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ display: { xs: 'block', md: 'none' }}} mt={2}>

                <Accordion className={"stat-border info"} expanded={expanded === 'info'} onChange={handleChange('info')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography> Info </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <InfoCard user={user} loading={loading}/>
                    </AccordionDetails>
                </Accordion>

                <Accordion className={"stat-border race-stats"} expanded={expanded === 'race-stats'} onChange={handleChange('race-stats')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography> Race Stats </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <RaceStats results={results} loading={results_loading}/>
                    </AccordionDetails>
                </Accordion>

                <Accordion className={"stat-border trophies"} expanded={expanded === 'trophies'} onChange={handleChange('trophies')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography> Trophy Cabinet </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Box m={-1.5}>
                            <TrophyCabinet loading={results_loading} results={results} />
                        </Box>
                    </AccordionDetails>
                </Accordion>

            </Box>

        </Container>
    </>
}

function InfoCard(props: {user: UserModel, loading: boolean}) {
    return <Paper elevation={3} sx={{ p: 1 }}>
        <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-evenly"
            sx={{
                my: 'auto'
            }}
        >
            <Info user={props.user} loading={props.loading} />
            <Licenses loading={props.loading} licenses={props.user.licenses}/>
        </Stack>
    </Paper>
}

function Info(props: {user: UserModel, loading: boolean}) {
    return props.loading ? <>
        <Skeleton/>
        <Skeleton/>
    </> : <>
        <Stack sx={{ mb: { xs: 1, md: 'auto' } }}>
            <Typography variant="h6" component="h1" fontWeight="bold">
                {props.user.name}
            </Typography>
            <Grid>
                <ClubLogo id={props.user.club_id} clubName={props.user.club_name}/>
            </Grid>
        </Stack>
    </>
}

function Licenses(props: {loading: boolean, licenses: UserLicenses}) {
    return <Stack direction="row" justifyContent="center" sx={{ my: 'auto' }}>
        <Stack>
            <RatingBadge
                loading={props.loading}
                category={1}
                license={props.licenses.oval.level}
                safety_rating={props.licenses.oval.sub_level}
                irating={props.licenses.oval.irating}
            />
            <RatingBadge
                loading={props.loading}
                category={3}
                license={props.licenses.dirt_oval.level}
                safety_rating={props.licenses.dirt_oval.sub_level}
                irating={props.licenses.dirt_oval.irating}
            />
        </Stack>
        <Stack>
            <RatingBadge
                loading={props.loading}
                category={2}
                license={props.licenses.road.level}
                safety_rating={props.licenses.road.sub_level}
                irating={props.licenses.road.irating}
            />
            <RatingBadge
                loading={props.loading}
                category={4}
                license={props.licenses.dirt_road.level}
                safety_rating={props.licenses.dirt_road.sub_level}
                irating={props.licenses.dirt_road.irating}
            />
        </Stack>
    </Stack>
}

function RaceStats(props: {results: Record<string, unknown>[], loading: boolean}) {

    if (props.loading) return <CircularProgress size="2em"/>

    const race_count = props.results.length
    let total_time = 0
    let laps = 0
    let laps_lead = 0
    let races_finished = 0
    let incidents = 0

    props.results.map(result => {
        laps += result['laps_complete'] as number
        total_time += (result['laps_complete'] as number) * (result['average_lap'] as number)
        laps_lead += result['laps_lead'] as number
        if (result['reason_out_id'] === 0) races_finished++
        incidents += result['incidents'] as number
    })

    const race_time = ElapsedTime(total_time / 10)
    const finish_percentage = Percentage(races_finished, race_count)
    const incident_avg = (incidents / race_count).toFixed(2)

    return (
        <Grid container spacing={1}>
            <StatCard elevation={5} name="Races" value={race_count}/>
            <StatCard elevation={3} name="Laps" value={laps}/>
            <StatCard elevation={3} name="Laps Lead" value={laps_lead}/>
            <StatCard elevation={3} name="Race Time" value={race_time} tooltip={"Total time spent driving in races"}/>
            <StatCard elevation={3} name="Finish %" value={finish_percentage} tooltip={"Percentage of races finished"}/>
            <StatCard elevation={3} name="Inc. Avg" value={incident_avg} tooltip={"Incident Average"}/>
        </Grid>
    )
}
