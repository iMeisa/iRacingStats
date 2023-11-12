import useFetch from "../../hooks/useFetch.ts";
import {useParams} from "react-router-dom";
import {SyntheticEvent, useEffect, useState} from "react";
import Grid from '@mui/material/Unstable_Grid2';
import Container from "@mui/material/Container";
import "./User.css"
import {Accordion, AccordionDetails, AccordionSummary, Box, Paper, Skeleton, Stack, Tooltip} from "@mui/material";
import RatingBadge from "../../components/data/RatingBadge.tsx";
import {User as UserModel, defaultUser, UserLicenses} from "./UserTypes.ts";
import TrophyCabinet from "./TrophyCabinet.tsx";
import ClubLogo from "../../components/images/ClubLogo.tsx";
import Typography from "@mui/material/Typography";
import DataRange from "../../functions/datetime/DataRange.ts";
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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


    const [expanded, setExpanded] = useState<string | false>('results');

    const handleChange =
        (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return <>
        {/*{user.id} {user.display_name} {String(loading)}*/}
        <Container>
            <Grid sx={{ display: {xs: 'none', md: 'flex'} }} container spacing={2} style={{ marginTop: '2em' }}>
                <Grid xs={12} md={6}>
                    <Paper sx={{ p: 1 }}>

                    <Typography variant="subtitle1" pb={0.5} fontWeight="bold">
                        Info
                    </Typography>

                    <InfoCard user={user} loading={loading}/>
                </Paper>
                </Grid>

                <Grid xs={12} md={6}>
                    <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Trophy Cabinet
                        </Typography>
                        <Tooltip placement="top" arrow title={'Data range: ' + DataRange()}>
                            <InfoIcon/>
                        </Tooltip>
                    </Stack>
                    <TrophyCabinet loading={results_loading} results={results}/>
                </Grid>
            </Grid>

            <Box sx={{ display: { xs: 'block', md: 'none' }}} mt={2}>

                <Accordion expanded={expanded === 'info'} onChange={handleChange('info')}>
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

                <Accordion expanded={expanded === 'trophies'} onChange={handleChange('trophies')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography> Trophy Cabinet </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <TrophyCabinet loading={results_loading} results={results}/>
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
            <Typography variant="subtitle1" component="h1" fontWeight="bold">
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
