import useFetchArray from "../../hooks/useFetchArray.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import "./Driver.css"
import DriverInfo, {InfoProps} from "./panels/Info.tsx";
import {DriverSummary, DefaultDriverSummary, DriverData, DefaultDriverData} from "../../models/DriverTypes.ts";
import SideMenu from "../../components/navigation/SideMenu.tsx";
import Box from "@mui/material/Box";
import DriverRaces from "./panels/Races.tsx";
import Grid from "@mui/material/Unstable_Grid2";
import DriverTracks from "./panels/Tracks.tsx";
import TrackStats from "./stats/TrackStats.ts";
import CarStats from "./stats/CarStats.ts";
import DriverCars from "./panels/Cars.tsx";
import useTabState from "../../hooks/useTabState.ts";
import SeriesStats from "./stats/SeriesStats.ts";
import DriverSeries from "./panels/Series.tsx";
import useFetchObject from "../../hooks/useFetchObject.ts";

const panels = ['info', 'series', 'races', 'tracks', 'cars']

export default function Driver() {
    const {id} = useParams()

    const [user, setUser] = useState(DefaultDriverSummary)

    const [users, loading] = useFetchArray<DriverSummary>(`/api/driver?cust_id=${id}`,
        (obj) => {
            // obj['id'] = obj['cust_id']
            return obj
        }
    )

    const [driver_data, data_loading] = useFetchObject<DriverData>(DefaultDriverData, `/api/driver_data?id=${id}`,
        // (obj) => {

            // obj['valid_race'] = (obj['field_size'] as number) >= 4 && (obj['event_laps_complete'] as number) >= 2
            //
            // obj['id'] = obj['result_id']
            // obj['dnf'] = obj['reason_out_id'] !== 0
            //
            // obj['sr_change'] = ((obj['new_sub_level'] as number) - (obj['old_sub_level'] as number)) / 100
            // obj['ir_change'] = (obj['newi_rating'] as number) - (obj['oldi_rating'] as number)
            //
            // let track = obj['track_name']
            // const track_config = obj['config_name']
            // if (track_config !== '') track += " - " + track_config
            // obj['track'] = track

            // return obj
        // }
    )

    const [trackStats, setTrackStats] = useState([] as Record<string, unknown>[])
    const [carStats, setCarStats] = useState([] as Record<string, unknown>[])
    const [seriesStats, setSeriesStats] = useState([] as Record<string, unknown>[])

    const [tab, setTab] = useTabState(panels)

    useEffect(() => {

        if (users.length > 0) setUser(users[0])
        if (!data_loading) {
            setTrackStats(TrackStats(driver_data.results))
            setCarStats(CarStats(driver_data.results))
            setSeriesStats(SeriesStats(driver_data.results))
        }

        console.log("users: ", users)
        console.log("results: ", driver_data)
    }, [users, driver_data, data_loading]);

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
                        driver_data={driver_data}
                        data_loading={data_loading}
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
                driver_data={driver_data}
                data_loading={data_loading}
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
            return <DriverInfo user={props.user} loading={props.loading} driver_data={props.driver_data} data_loading={props.data_loading}/>
        }
        case 1: {
            return <DriverSeries stats={props.seriesStats} loading={props.data_loading}/>
        }
        case 2: {
            return <DriverRaces results={props.driver_data.results} loading={props.data_loading} />
        }
        case 3: {
            return <DriverTracks stats={props.trackStats} loading={props.data_loading} />
        }
        case 4: {
            return <DriverCars stats={props.carStats} loading={props.data_loading} />
        }
        default: {
            return <></>
        }
    }
}
