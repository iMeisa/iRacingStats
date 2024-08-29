import "./SeriesList.css"
import Container from "@mui/material/Container";
import SideMenu from "../../../components/navigation/SideMenu.tsx";
import Grid from "@mui/material/Unstable_Grid2";
import SeriesTable from "./panels/SeriesTable.tsx";
import useTabState from "../../../hooks/useTabState.ts";
import {Series} from "../../../models/Series.ts";
import ContentCache from "../../../cache/ContentCache.ts";
import SeriesParticipation, {SeriesPop} from "./panels/SeriesParticipation.tsx";
import ToTitle from "../../../functions/strings/Title.ts";
import useFetchArray from "../../../hooks/useFetchArray.ts";
import {SeriesById} from "../../../cache/CachesById.ts";
import PageTitle from "../../../functions/strings/PageTitle.ts";


const panels = [
    'list',
    'popularity',
]

export default function SeriesList() {

    PageTitle('Series')

    const [tab, setTab] = useTabState(panels)

    const rows = ContentCache<Series>("series")
        // useFetchArray<Series>('/api/series_list')

    const [seriesPop, popLoading] =
        useFetchArray<SeriesPop>('/api/series_popularity', obj => {
            obj['category'] = ToTitle(obj['category'] as string)

            const series = SeriesById()[obj.id]
            obj.logo = series.series_logo
            obj.name = series.series_short_name
            return obj
        })

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
                        seriesPopularity={seriesPop}
                        seriesPopLoading={popLoading}
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
    seriesPopularity: SeriesPop[],
    seriesPopLoading: boolean,
    series: Series[],
}

function Tabs(props: TabProps) {
    switch (props.tab) {
        // case 1: {
        case 0: {
            return <SeriesTable series={props.series} />
        }
        case 1: {
            return <SeriesParticipation series={props.seriesPopularity} loading={props.seriesPopLoading} />
        }
        default: {
            return <></>
        }
    }
}
