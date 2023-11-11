import useFetch from "../../hooks/useFetch.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Unstable_Grid2';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import "./User.css"
import {Paper, Stack} from "@mui/material";
import RatingBadge from "../../components/data/RatingBadge.tsx";
import {User as UserModel, defaultUser} from "./UserTypes.ts";

export default function User() {
    const {id} = useParams()

    const [user, setUser] = useState(defaultUser)

    const [users, _loading] = useFetch<UserModel>(`/api/user?cust_id=${id}`,
            (obj) => {
                // obj['id'] = obj['cust_id']
                return obj
            })

    const [results, _] = useFetch(`/api/driver_results?id=${id}`)

    useEffect(() => {

        if (users.length > 0) setUser(users[0])

        console.log("users: ", users)
        console.log("results: ", results)
    }, [users, results]);

    return <>
        {/*{user.id} {user.display_name} {String(loading)}*/}
        <Container>
            <Grid container spacing={2} style={{ marginTop: '2em' }}>

                <Grid md={6}>

                    <Paper>

                        <Stack direction="row" spacing={1}>

                            <Grid xs={6}>
                                <Paper elevation={3}>
                                    <Typography>
                                        {user.name}
                                    </Typography>
                                </Paper>
                            </Grid>

                            <Grid xs={6}>
                                <Paper elevation={3}>
                                    <Stack direction="row">
                                        <Stack>
                                            <RatingBadge
                                                category={1}
                                                license={user.licenses.oval.level}
                                                safety_rating={user.licenses.oval.sub_level}
                                                irating={user.licenses.oval.irating}
                                            />
                                            <RatingBadge
                                                category={3}
                                                license={user.licenses.dirt_oval.level}
                                                safety_rating={user.licenses.dirt_oval.sub_level}
                                                irating={user.licenses.dirt_oval.irating}
                                            />
                                        </Stack>
                                        <Stack>
                                            <RatingBadge
                                                category={2}
                                                license={user.licenses.road.level}
                                                safety_rating={user.licenses.road.sub_level}
                                                irating={user.licenses.road.irating}
                                            />
                                            <RatingBadge
                                                category={4}
                                                license={user.licenses.dirt_road.level}
                                                safety_rating={user.licenses.dirt_road.sub_level}
                                                irating={user.licenses.dirt_road.irating}
                                            />
                                        </Stack>
                                    </Stack>
                                </Paper>
                            </Grid>
                        </Stack>
                    </Paper>

                </Grid>

                {/*<Grid container md>*/}

                {/*    <Grid md>*/}
                {/*        <Paper>{UnixToDate(user.member_since)}</Paper>*/}
                {/*    </Grid>*/}
                {/*    <Grid md>*/}
                {/*        <Paper>{user.club_name}</Paper>*/}
                {/*    </Grid>*/}

                {/*</Grid>*/}

                {/*<Grid container md={4}>*/}
                {/*    <Grid xs>*/}
                {/*        <Paper elevation={12} sx={{ height: '10rem', lineHeight: '5rem' }}>*/}
                {/*            <Typography variant="h6">{user.display_name}</Typography>*/}
                {/*            <ClubLogo id={user.club_id} clubName={user.club_name} />*/}
                {/*        </Paper>*/}
                {/*    </Grid>*/}

                {/*</Grid>*/}
            </Grid>
        </Container>
    </>
}
