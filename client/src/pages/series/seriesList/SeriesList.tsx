import useFetchArray from "../../../hooks/useFetchArray.ts";
import ToTitle from "../../../functions/strings/Title.ts";
import "./SeriesList.css"
import Container from "@mui/material/Container";
import SideMenu from "../../../components/navigation/SideMenu.tsx";
import Grid from "@mui/material/Unstable_Grid2";
import SeriesTable from "./panels/SeriesTable.tsx";
import SeriesParticipation, {SeriesPop} from "./panels/SeriesParticipation.tsx";
import useTabState from "../../../hooks/useTabState.ts";


const panels = ['popularity', 'list']

export default function SeriesList() {

    const [tab, setTab] = useTabState(panels)

    const [rows, loading] =
        useFetchArray('/api/series', obj => {
            obj['category'] = ToTitle(obj['category'] as string)
            // obj['sr_change'] = Number(Number(obj['sr_change']).toFixed(2))
            return obj
        })

    const [seriesPop, popLoading] =
        useFetchArray<SeriesPop>('/api/series_popularity', obj => {
            obj['category'] = ToTitle(obj['category'] as string)
            return obj
        })

    // const isMobile = useIsMobile()

    // TODO: Fetch sr change separately

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
                        loading={loading}
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
    series: Record<string, unknown>[],
    loading: boolean,
}

function Tabs(props: TabProps) {
    switch (props.tab) {
        case 0: {
            return <SeriesParticipation series={props.seriesPopularity} loading={props.seriesPopLoading} />
        }
        case 1: {
            return <SeriesTable series={props.series} loading={props.loading} />
        }
        default: {
            return <></>
        }
    }
}
