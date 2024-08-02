import {useParams} from "react-router-dom";
import {useEffect} from "react";
import Container from "@mui/material/Container";
import "./Driver.css"
import DriverInfo, {InfoProps} from "./panels/Info.tsx";
import {DriverSummary, DefaultDriverSummary} from "../../models/driver/Driver.ts";
import SideMenu from "../../components/navigation/SideMenu.tsx";
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
import AddRecentDriver from "../../storage/AddRecentDriver.ts";
import DataRange from "../../components/data/DataRange.tsx";
import DriverTitle from "./DriverTitle.tsx";
import useIsMobile from "../../hooks/useIsMobile.ts";
import {Adsense} from "@ctrl/react-adsense";
import PageTitle from "../../functions/strings/PageTitle.ts";

const panels = ['info', 'series', 'races', 'tracks', 'cars']

export default function Driver() {
    const {id} = useParams()

    const isMobile = useIsMobile()

    const [driver, driver_loading] = useFetchObject<DriverSummary>(DefaultDriverSummary, `/api/driver?cust_id=${id}`)

    const [driver_races, races_loading] = FetchDriverRaces(id)

    const carStats = CarStats(driver_races, races_loading)
    const seriesStats = SeriesStats(driver_races, races_loading)
    const trackStats = TrackStats(driver_races, races_loading)

    const [tab, setTab] = useTabState(panels)

    useEffect(() => {

        if (!driver_loading) {
            AddRecentDriver(driver)
            PageTitle(driver.name)
        }

        console.log("user: ", driver)
        console.log("results: ", driver_races)
    }, [driver, driver_races, races_loading]);

    return <>
        {/*Desktop*/}
        <Grid container display={ isMobile ? 'block' : 'flex' }>
            <Grid xs={0} md={1}>
                <SideMenu initialTab={tab} panels={panels} onChange={value => setTab(value)}/>
            </Grid>
            <Grid xs md>
                <Container maxWidth="xl">

                    <DriverTitle driver={driver} loading={driver_loading}/>
                    <SideMenu mobile initialTab={tab} panels={panels} onChange={value => setTab(value)}/>
                    <Tabs
                        tab={tab}
                        user={driver}
                        loading={driver_loading}
                        driver_races={driver_races}
                        data_loading={races_loading}
                        trackStats={trackStats}
                        carStats={carStats}
                        seriesStats={seriesStats}
                    />

                    <DataRange/>

                </Container>
            </Grid>
            <Grid xs={0} md={1}>
                <Adsense
                    client={"ca-pub-5118888052597442"}
                    slot={"3365671265"}
                    adTest={"on"}
                />
            </Grid>
        </Grid>
    </>
}

interface TabProps extends InfoProps {
    tab: number,
    trackStats: Record<string, unknown>[],
    carStats: Record<string, unknown>[],
    seriesStats: Record<string, unknown>[],
}

function Tabs(props: TabProps) {
    switch (props.tab) {
        case 0: {
            return <DriverInfo user={props.user} loading={props.loading} driver_races={props.driver_races}
                               data_loading={props.data_loading}/>
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
