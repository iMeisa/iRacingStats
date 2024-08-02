import {useParams} from "react-router-dom";
import useFetchArray from "../../../hooks/useFetchArray.ts";
import {Series} from "../../../models/Series.ts";
import Grid from "@mui/material/Unstable_Grid2";
import SideMenu from "../../../components/navigation/SideMenu.tsx";
import Info from "./panels/Info.tsx";
import Races from "./panels/Races.tsx";
import Container from "@mui/material/Container";
import useTabState from "../../../hooks/useTabState.ts";
import SeriesLogo from "../../../components/images/SeriesLogo.tsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {SeriesById} from "../../../cache/CachesById.ts";
import {Season} from "../../../models/Season.ts";
import Seasons from "./panels/Seasons.tsx";
import Footer from "../../../components/navigation/Footer.tsx";
import {useEffect} from "react";
import {Session} from "../../../models/Session.ts";
import TrackName from "../../../functions/data/TrackName.ts";
import {LicenseTertiaryColor} from "../../../functions/img/LicenseColor.ts";
import PageTitle from "../../../functions/strings/PageTitle.ts";

const panels = ['info', 'races', 'seasons']
const titleHeight = 80

export default function SingleSeries() {

    const {id} = useParams()

    const series = SeriesById()[Number(id)]
    const [seasons, seasons_loading] = useFetchArray<Season>(`/api/seasons?series_id=${id}`)
    const [races, races_loading] =
        useFetchArray<Session>(
            `/api/series_sessions?id=${id}`,
            race => {

                race.min_license_level = series.min_license_level
                race.track = TrackName(race.track_id)

                return race
            }
        )

    const [tab, setTab] = useTabState(panels)

    useEffect(() => {
        console.log(races)
    }, [races])

    PageTitle(series.series_name)

    return <Box>
        <Box height={0} sx={{
            zIndex: 0,
            boxShadow: '0px 2px 2px 2px ' + LicenseTertiaryColor(series.min_license_level)
        }}/>
        <Grid container>
            <Grid xs={0} md={1}>
                <SideMenu initialTab={tab} panels={panels} onChange={value => setTab(value)}/>
            </Grid>
            <Grid xs={12} md mt={1}>
                <Container maxWidth="xl">

                    <Box mt={1} mb={2} display='flex' justifyContent='center' width={'100%'}>

                        <Box height={titleHeight}>
                            <SeriesLogo width={120} link={series.series_logo}/>
                        </Box>

                        <Box
                            ml={2}
                            display="flex"
                            justifyContent="center"
                            flexDirection="row"
                            alignItems="center"
                            textAlign="center"
                            height={`${titleHeight}px`}
                        >
                            <Typography variant="h5" fontWeight="bold" fontFamily='Verdana'>
                                {series.series_name}
                            </Typography>
                        </Box>
                    </Box>

                    <SideMenu initialTab={tab} mobile panels={panels} onChange={value => setTab(value)}/>
                    <Tabs
                        tab={tab}
                        series={series}
                        seasons={seasons}
                        seasons_loading={seasons_loading}
                        races={races}
                        races_loading={races_loading}
                    />
                </Container>
            </Grid>

            <Footer/>
        </Grid>
    </Box>
}

type TabProps = {
    tab: number
    series: Series,
    seasons: Season[],
    seasons_loading: boolean,
    races: Session[],
    races_loading: boolean
}

function Tabs(props: TabProps) {
    switch (props.tab) {
        case 0: {
            return <Info
                loading={props.races_loading}
                series={props.series}
                seasons={props.seasons}
                seasons_loading={props.seasons_loading}
                races={props.races}
                races_loading={props.races_loading}
            />
        }
        case 1: {
            return <Races results={props.races} loading={props.races_loading}/>
        }
        case 2: {
            return <Seasons seasons={props.seasons} seasons_loading={props.seasons_loading}/>
        }
        default: {
            return <></>
        }
    }
}
