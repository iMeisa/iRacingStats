import {useParams} from "react-router-dom";
import useFetchArray from "../../../hooks/useFetchArray.ts";
import {Series as SeriesModel, DefaultSeries} from "../../../models/Series.ts";
import Grid from "@mui/material/Unstable_Grid2";
import SideMenu from "../../../components/navigation/SideMenu.tsx";
import Info from "./panels/Info.tsx";
import Races from "./panels/Races.tsx";
import Container from "@mui/material/Container";
import useTabState from "../../../hooks/useTabState.ts";
import SeriesLogo from "../../../components/images/SeriesLogo.tsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useFetchObject from "../../../hooks/useFetchObject.ts";
import {useEffect} from "react";
import {Skeleton} from "@mui/material";

const panels = ['info', 'races']

export default function SingleSeries() {

    const {id} = useParams()

    const [series, loading] = useFetchObject<SeriesModel>(DefaultSeries, `/api/series?id=${id}`)
    const [races, races_loading] = useFetchArray(`/api/series_sessions?id=${id}`)

    const [tab, setTab] = useTabState(panels)

    useEffect(() => {
        console.log(series)
    }, [series])


    return <Grid container>
        <Grid md={1}>
            <SideMenu initialTab={tab} panels={panels} onChange={value => setTab(value)}/>
        </Grid>
        <Grid md mt={2}>
            <Container maxWidth="xl">

                <Box display='flex' justifyContent='center'>
                    <SeriesLogo width={120} height={80} link={series.logo}/>
                    { loading ?
                        <Skeleton width={500}/> :
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            mt={2}
                            fontFamily='Verdana'
                        >
                            {series.name}
                        </Typography>
                    }
                </Box>

                <SideMenu initialTab={tab} mobile panels={panels} onChange={value => setTab(value)}/>
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
