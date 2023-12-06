import {useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch.ts";
import {useEffect, useState} from "react";
import {Series as SeriesModel, SeriesDefault} from "../../types/Types.ts";
import Grid from "@mui/material/Unstable_Grid2";
import SideMenu from "../../components/navigation/SideMenu.tsx";
import Info from "./panels/Info.tsx";
import Races from "./panels/Races.tsx";
import Container from "@mui/material/Container";

const panels = ['Info', 'Races']

export default function Series() {

    const {id} = useParams()

    const [seriess, loading] = useFetch<SeriesModel>(`/api/series?id=${id}`)

    const [series, setSeries] = useState(SeriesDefault)

    const [tab, setTab] = useState(0)

    const [races, races_loading] = useFetch(`/api/series_sessions?id=${id}`)

    useEffect(() => {
        if (seriess.length < 1) return
        setSeries(seriess[0])
        console.log('series: ', series)
        console.log('races: ', races)
    }, [seriess, races]);

    return <Grid container>
        <Grid md={1}>
            <SideMenu panels={panels} onChange={value => setTab(value)}/>
        </Grid>
        <Grid md mt={2}>
            <Container maxWidth="xl">
                <Tabs tab={tab} series_loading={loading} series_logo={series.logo} series_name={series.name} races={races} races_loading={races_loading}/>
            </Container>
        </Grid>
    </Grid>
}

type TabProps = {
    tab: number
    series_loading: boolean,
    series_logo: string,
    series_name: string,
    races: Record<string, unknown>[]
    races_loading: boolean
}

function Tabs(props: TabProps) {
    console.log(props.tab)
    switch (props.tab) {
        case 0: {
            return <Info loading={props.series_loading} logo={props.series_logo} name={props.series_name}/>
        }
        case 1: {
            return <Races results={props.races} loading={props.races_loading}/>
        }
        default: {
            return <></>
        }
    }
}
