import useFetch from "../../hooks/useFetch.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import "./User.css"
import UserInfo, {InfoProps} from "./panels/Info.tsx";
import {User as UserModel, defaultUser} from "./UserTypes.ts";
import SideMenu from "../../components/navigation/SideMenu.tsx";
import Box from "@mui/material/Box";
import UserRaces from "./panels/Races.tsx";
import Grid from "@mui/material/Unstable_Grid2";
import UserTracks from "./panels/Tracks.tsx";
import TrackStats from "./stats/TrackStats.ts";
import CarStats from "./stats/CarStats.ts";
import UserCars from "./panels/Cars.tsx";
import useTabState from "../../hooks/useTabState.ts";
import SeriesStats from "./stats/SeriesStats.ts";
import UserSeries from "./panels/Series.tsx";

const panels = ['info', 'series', 'races', 'tracks', 'cars']

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

            obj['valid_race'] = (obj['field_size'] as number) >= 4 && (obj['event_laps_complete'] as number) >= 2

            obj['id'] = obj['result_id']
            obj['dnf'] = obj['reason_out_id'] !== 0

            let track = obj['track_name']
            const track_config = obj['config_name']
            if (track_config !== '') track += " - " + track_config
            obj['track'] = track

            return obj
        }
    )

    const [trackStats, setTrackStats] = useState([] as Record<string, unknown>[])
    const [carStats, setCarStats] = useState([] as Record<string, unknown>[])
    const [seriesStats, setSeriesStats] = useState([] as Record<string, unknown>[])

    const [tab, setTab] = useTabState(panels)

    useEffect(() => {

        if (users.length > 0) setUser(users[0])
        if (!results_loading) {
            setTrackStats(TrackStats(results))
            setCarStats(CarStats(results))
            setSeriesStats(SeriesStats(results))
        }

        console.log("users: ", users)
        console.log("results: ", results)
    }, [users, results]);

    return <>
        {/*Desktop*/}
        <Grid container display={{ xs: 'none', sm: 'none', md: 'flex' }}>
            <Grid md={1}>
                <SideMenu initialTab={tab} panels={panels} onChange={value => setTab(value)}/>
            </Grid>
            <Grid md>
                <Container maxWidth="xl">
                    <Tabs
                        tab={tab}
                        user={user}
                        loading={loading}
                        results={results}
                        results_loading={results_loading}
                        trackStats={trackStats}
                        carStats={carStats}
                        seriesStats={seriesStats}
                    />
                </Container>
            </Grid>
        </Grid>

        {/*Mobile*/}
        <Container sx={{display: {sm: 'block', md:'none'}}}>
            <SideMenu initialTab={tab} panels={panels} mobile onChange={value => setTab(value)}/>
            <Tabs
                tab={tab}
                user={user}
                loading={loading}
                results={results}
                results_loading={results_loading}
                trackStats={trackStats}
                carStats={carStats}
                seriesStats={seriesStats}
            />
        </Container>

        <Box height={'2em'} display={{xs: 'block', md: 'none'}}/>
    </>
}

interface TabProps extends InfoProps {
    tab: number,
    trackStats: Record<string, unknown>[],
    carStats: Record<string, unknown>[],
    seriesStats: Record<string, unknown>[],
}

function Tabs(props: TabProps) {
    // console.log(props.tab)
    switch (props.tab) {
        case 0: {
            return <UserInfo user={props.user} loading={props.loading} results={props.results} results_loading={props.results_loading}/>
        }
        case 1: {
            return <UserSeries stats={props.seriesStats} loading={props.results_loading}/>
        }
        case 2: {
            return <UserRaces results={props.results} loading={props.results_loading} />
        }
        case 3: {
            return <UserTracks stats={props.trackStats} loading={props.results_loading} />
        }
        case 4: {
            return <UserCars stats={props.carStats} loading={props.results_loading} />
        }
        default: {
            return <></>
        }
    }
}
