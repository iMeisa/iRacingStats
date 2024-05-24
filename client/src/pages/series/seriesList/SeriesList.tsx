import "./SeriesList.css"
import Container from "@mui/material/Container";
import SideMenu from "../../../components/navigation/SideMenu.tsx";
import Grid from "@mui/material/Unstable_Grid2";
import SeriesTable from "./panels/SeriesTable.tsx";
import useTabState from "../../../hooks/useTabState.ts";
import {Series} from "../../../models/Series.ts";
import ContentCache from "../../../cache/ContentCache.ts";


const panels = [
    // 'popularity',
    'list'
]

export default function SeriesList() {

    const [tab, setTab] = useTabState(panels)

    const rows = ContentCache<Series>("series")
        // useFetchArray<Series>('/api/series_list')

    // const [seriesPop, popLoading] =
    //     useFetchArray<SeriesPop>('/api/series_popularity', obj => {
    //         obj['category'] = ToTitle(obj['category'] as string)
    //         return obj
    //     })

    return <>
        <Grid container>
            <Grid md={1}>
                <SideMenu initialTab={tab} panels={panels} onChange={value => setTab(value)}/>
            </Grid>

            <Grid md xs={12} >
                <SideMenu initialTab={tab} mobile panels={panels} onChange={value => setTab(value)}/>
                <Container maxWidth="xl" sx={{ mt: 1 }}>
                    <Tabs
                        tab={tab}
                        // seriesPopularity={seriesPop}
                        // seriesPopLoading={popLoading}
                        series={rows}
                        // loading={popLoading}
                    />
                </Container>
            </Grid>
        </Grid>
    </>
}


interface TabProps {
    tab: number,
    series: Series[],
}

function Tabs(props: TabProps) {
    switch (props.tab) {
        // case 0: {
        //     return <SeriesParticipation series={props.seriesPopularity} loading={props.seriesPopLoading} />
        // }
        // case 1: {
        case 0: {
            return <SeriesTable series={props.series} />
        }
        default: {
            return <></>
        }
    }
}
