import useFetch from "../../hooks/useFetch.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Grid from '@mui/material/Unstable_Grid2';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import "./User.css"
import {Paper, Stack} from "@mui/material";
import RatingBadge from "../../components/data/RatingBadge.tsx";

type User = {
    id: number,
    display_name: string,
    member_since: number,
    club_id: number,
    club_name: string,
}

export default function User() {
    const {id} = useParams()

    const emptyUser: User = {id: 0, display_name: '', member_since: 0, club_id: 0, club_name: ''}
    const [user, setUser] = useState(emptyUser)

    const [users, _loading] = useFetch<User>(`/api/user?cust_id=${id}`,
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
                                        {user.display_name}
                                    </Typography>
                                </Paper>
                            </Grid>

                            <Grid xs={6}>
                                <Paper elevation={3}>
                                    <Stack direction="row">
                                        <Stack>
                                            <RatingBadge category={1}/>
                                            <RatingBadge category={2}/>
                                        </Stack>
                                        <Stack>
                                            <RatingBadge category={3}/>
                                            <RatingBadge category={4}/>
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
