import useFetch from "../../../hooks/useFetch.ts";
import ToTitle from "../../../functions/strings/Title.ts";
import "./SeriesList.css"
import Container from "@mui/material/Container";
import SideMenu from "../../../components/navigation/SideMenu.tsx";
import {useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import SeriesTable from "./panels/SeriesTable.tsx";
import SeriesParticipation from "./panels/SeriesParticipation.tsx";


const panels = ['Popularity', 'List']

export default function SeriesList() {

    const [rows, loading] =
        useFetch('/api/series', obj => {
            obj['category'] = ToTitle(obj['category'] as string)
            // obj['sr_change'] = Number(Number(obj['sr_change']).toFixed(2))
            return obj
        })

    const [tab, setTab] = useState(0)
    // const isMobile = useIsMobile()

    // TODO: Fetch sr change separately

    return <>
        <Grid container>
            <Grid md={1}>
                <SideMenu panels={panels} onChange={value => setTab(value)}/>
            </Grid>

            <Grid md xs={12}>
                <SideMenu mobile panels={panels} onChange={value => setTab(value)}/>
                <Container maxWidth="xl">
                    <Tabs tab={tab} series={rows} loading={loading}/>
                </Container>
            </Grid>
        </Grid>
    </>
}


interface TabProps {
    tab: number,
    series: Record<string, unknown>[],
    loading: boolean,
}

function Tabs(props: TabProps) {
    // console.log(props.tab)
    switch (props.tab) {
        case 0: {
            return <SeriesParticipation series={props.series} />
        }
        case 1: {
            return <SeriesTable series={props.series} loading={props.loading} />
        }
        default: {
            return <></>
        }
    }
}
