import useFetch from "../../hooks/useFetch.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Unstable_Grid2';
import Container from "@mui/material/Container";
import "./User.css"
import {Paper, Skeleton, Stack} from "@mui/material";
import RatingBadge from "../../components/data/RatingBadge.tsx";
import {User as UserModel, defaultUser, UserLicenses} from "./UserTypes.ts";
import TrophyCabinet from "./TrophyCabinet.tsx";
import ClubLogo from "../../components/images/ClubLogo.tsx";
import Typography from "@mui/material/Typography";

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

    return <>
        {/*{user.id} {user.display_name} {String(loading)}*/}
        <Container>
            <Grid container spacing={2} style={{ marginTop: '2em' }}>
                <Grid xs={12} md={6}>
                    <Paper sx={{ pt: 2 }}>
                        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-evenly">
                            <Info user={user} loading={loading} />
                            <Licenses licenses={user.licenses}/>
                        </Stack>
                    </Paper>

                </Grid>

                <Grid xs={12} md={6}>
                    <TrophyCabinet loading={results_loading} results={results}/>
                </Grid>
            </Grid>
        </Container>
    </>
}

function Info(props: {user: UserModel, loading: boolean}) {
    return props.loading ? <>
        <Skeleton/>
        <Skeleton/>
    </> : <>
        <Stack>
            <Typography variant="subtitle2" component="h6">
                {props.user.name}
            </Typography>
            <Grid>
                <ClubLogo id={props.user.club_id} clubName={props.user.club_name}/>
            </Grid>
        </Stack>
    </>
}

function Licenses(props: {licenses: UserLicenses}) {
    return <Stack direction="row" justifyContent="center" sx={{ pb: 2 }}>
        <Stack>
            <RatingBadge
                category={1}
                license={props.licenses.oval.level}
                safety_rating={props.licenses.oval.sub_level}
                irating={props.licenses.oval.irating}
            />
            <RatingBadge
                category={3}
                license={props.licenses.dirt_oval.level}
                safety_rating={props.licenses.dirt_oval.sub_level}
                irating={props.licenses.dirt_oval.irating}
            />
        </Stack>
        <Stack>
            <RatingBadge
                category={2}
                license={props.licenses.road.level}
                safety_rating={props.licenses.road.sub_level}
                irating={props.licenses.road.irating}
            />
            <RatingBadge
                category={4}
                license={props.licenses.dirt_road.level}
                safety_rating={props.licenses.dirt_road.sub_level}
                irating={props.licenses.dirt_road.irating}
            />
        </Stack>
    </Stack>
}
