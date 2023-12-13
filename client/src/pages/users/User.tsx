import useFetch from "../../hooks/useFetch.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import "./User.css"
import UserInfo, {InfoProps} from "./panels/Info.tsx";
import {User as UserModel, defaultUser} from "./UserTypes.ts";
import SideMenu from "../../components/navigation/SideMenu.tsx";
import Box from "@mui/material/Box";
import Races from "./panels/Races.tsx";
import Grid from "@mui/material/Unstable_Grid2";

const panels = ['Info', 'Races']

export default function User() {
    const {id} = useParams()

    const [user, setUser] = useState(defaultUser)

    const [users, loading] = useFetch<UserModel>(`/api/user?cust_id=${id}`,
        (obj) => {
            // obj['id'] = obj['cust_id']
            return obj
        }
    )

    const [results, results_loading] = useFetch(`/api/driver_results?id=${id}`,
        (obj) => {

            obj['valid_race'] = (obj['field_size'] as number) >= 4 || (obj['event_laps_complete'] as number) < 2

            obj['id'] = obj['result_id']
            obj['dnf'] = obj['reason_out_id'] !== 0

            let track = obj['track_name']
            const track_config = obj['config_name']
            if (track_config !== '') track += " - " + track_config
            obj['track'] = track

            return obj
        }
    )

    const [tab, setTab] = useState(0)

    useEffect(() => {

        if (users.length > 0) setUser(users[0])

        console.log("users: ", users)
        console.log("results: ", results)
    }, [users, results]);

    return <>
        {/*Desktop*/}
        <Grid container display={{ xs: 'none', sm: 'none', md: 'flex' }}>
            <Grid md={1}>
                <SideMenu panels={panels} onChange={value => setTab(value)}/>
            </Grid>
            <Grid md>
                <Container maxWidth="xl">
                    <Tabs tab={tab} user={user} loading={loading} results={results} results_loading={results_loading}/>
                </Container>
            </Grid>
        </Grid>

        {/*Mobile*/}
        <Container sx={{display: {sm: 'block', md:'none'}}}>
            <SideMenu panels={panels} mobile onChange={value => setTab(value)}/>
            <Tabs tab={tab} user={user} loading={loading} results={results} results_loading={results_loading}/>
        </Container>

        <Box height={'2em'} display={{xs: 'block', md: 'none'}}/>
    </>
}

interface TabProps extends InfoProps {
    tab: number,
}

function Tabs(props: TabProps) {
    console.log(props.tab)
    switch (props.tab) {
        case 0: {
            return <UserInfo user={props.user} loading={props.loading} results={props.results} results_loading={props.results_loading}/>
        }
        case 1: {
            return <Races results={props.results} loading={props.results_loading} />
        }
        default: {
            return <></>
        }
    }
}
