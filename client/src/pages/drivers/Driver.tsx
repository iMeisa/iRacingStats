import useFetchArray from "../../hooks/useFetchArray.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
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
import {DefaultDriverRace, DriverRace} from "../../models/driver/Race.ts";
import useFetchObject from "../../hooks/useFetchObject.ts";
import FillDriverRaceData from "../../functions/driver/FillDriverRaceData.ts";

const panels = ['info', 'series', 'races', 'tracks', 'cars']

export default function Driver() {
    const {id} = useParams()

    console.log('default', DefaultDriverRace)

    const [user, loading] = useFetchObject<DriverSummary>(DefaultDriverSummary, `/api/driver?cust_id=${id}`)

    let [driver_races, races_loading] = useFetchArray<DriverRace>(`/api/driver_races?id=${id}`,
        (race) => {

            // race.car_id = 1

            race.valid_race = race.field_size >= 4 && race.event_laps_complete >= 2

            // race['id'] = race['result_id']
            race.dnf = race.reason_out_id !== 0

            race.sr_change = (race.new_sub_level - race.old_sub_level) / 100
            race.ir_change = race.newi_rating - race.oldi_rating

            // let track = race['track_name']
            // const track_config = race['config_name']
            // if (track_config !== '') track += " - " + track_config
            // race['track'] = track

            return race
        }
    )

    const [trackStats, setTrackStats] = useState([] as Record<string, unknown>[])
    const [carStats, setCarStats] = useState([] as Record<string, unknown>[])
    const [seriesStats, setSeriesStats] = useState([] as Record<string, unknown>[])

    const [tab, setTab] = useTabState(panels)

    useEffect(() => {

        if (!races_loading) {
            setTrackStats(TrackStats(driver_races))
            setCarStats(CarStats(driver_races))
            setSeriesStats(SeriesStats(driver_races))
        }

        console.log("user: ", user)
        console.log("results: ", driver_races)
        // driver_races = FillDriverRaceData(driver_races)
    }, [user, driver_races, races_loading]);

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
            <Tabs
                tab={tab}
                user={user}
                loading={loading}
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
