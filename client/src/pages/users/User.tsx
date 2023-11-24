import useFetch from "../../hooks/useFetch.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import "./User.css"
import UserInfo, {InfoProps} from "./panels/Info.tsx";
import {User as UserModel, defaultUser} from "./UserTypes.ts";
import UserMenu from "./UserMenu.tsx";
import Box from "@mui/material/Box";
import Races from "./panels/Races.tsx";

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
            obj['id'] = obj['result_id']
            obj['dnf'] = obj['reason_out_id'] !== 0
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
        {/*{user.id} {user.display_name} {String(loading)}*/}
        <Box display={'flex'}>
            <UserMenu onChange={value => setTab(value)}/>
            <Container maxWidth="xl">
                <UserMenu mobile onChange={value => setTab(value)}/>
                <Tabs tab={tab} user={user} loading={loading} results={results} results_loading={results_loading}/>
            </Container>
        </Box>
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
