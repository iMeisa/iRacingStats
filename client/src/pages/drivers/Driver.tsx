import {useParams} from "react-router-dom";
import {useEffect} from "react";
import Container from "@mui/material/Container";
import "./Driver.css"
import DriverInfo, {InfoProps} from "./panels/Info.tsx";
import {DriverSummary, DefaultDriverSummary} from "../../models/driver/Driver.ts";
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
import FetchDriverRaces from "./FetchDriverRaces.ts";
import Typography from "@mui/material/Typography";

const panels = ['info', 'series', 'races', 'tracks', 'cars']

export default function Driver() {
    const {id} = useParams()

    const [user, user_loading] = useFetchObject<DriverSummary>(DefaultDriverSummary, `/api/driver?cust_id=${id}`)

    const [driver_races, races_loading] = FetchDriverRaces(id)

    const carStats = CarStats(driver_races, races_loading)
    const seriesStats = SeriesStats(driver_races, races_loading)
    const trackStats = TrackStats(driver_races, races_loading)

    const [tab, setTab] = useTabState(panels)

    useEffect(() => {

        console.log("user: ", user)
        console.log("results: ", driver_races)
    }, [user, driver_races, races_loading]);

    return <>
        {/*Desktop*/}
        <Grid container display={{ xs: 'none', sm: 'none', md: 'flex' }}>
            <Grid md={1}>
                <SideMenu initialTab={tab} panels={panels} onChange={value => setTab(value)}/>
            </Grid>
            <Grid md>
                <Container maxWidth="xl">
                    <DriverName name={user.name}/>
                    <Tabs
                        tab={tab}
                        user={user}
                        loading={user_loading}
                        driver_races={driver_races}
                        data_loading={races_loading}
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
            <DriverName name={user.name}/>
            <Tabs
                tab={tab}
                user={user}
                loading={user_loading}
                driver_races={driver_races}
                data_loading={races_loading}
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
            return <DriverInfo user={props.user} loading={props.loading} driver_races={props.driver_races} data_loading={props.data_loading}/>
        }
        case 1: {
            return <DriverSeries stats={props.seriesStats} loading={props.data_loading}/>
        }
        case 2: {
            return <DriverRaces results={props.driver_races} loading={props.data_loading} />
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

function DriverName(props: {name: string}) {
    return <Typography mt={2} variant="h5" fontWeight="bold">{props.name}</Typography>
}
