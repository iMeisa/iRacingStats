import useFetch from "../../hooks/useFetch.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
// import {Paper} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Container from "@mui/material/Container";
import { Item } from "../../components/data/Item.tsx";
import ClubLogo from "../../components/images/ClubLogo.tsx";

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

    const [users, _] =
        useFetch<User>(`/api/user?cust_id=${id}`,
            (obj) => {
                // obj['id'] = obj['cust_id']
                return obj
            })

    useEffect(() => {

        if (users.length > 0) setUser(users[0])

        console.log("users: ", users)
    }, [users]);

    return <>
        {/*{user.id} {user.display_name} {String(loading)}*/}
        <Container>
            <Grid container spacing={2} style={{ marginTop: '2em' }}>
                <Grid>
                    <Item elevation={12}>
                        {user.display_name}
                        <ClubLogo id={user.club_id} clubName={user.club_name} />
                    </Item>
                </Grid>
                <Grid>
                    <Item>{user.member_since}</Item>
                </Grid>
                <Grid>
                    <Item>{user.club_name}</Item>
                </Grid>
            </Grid>
        </Container>
    </>
}
