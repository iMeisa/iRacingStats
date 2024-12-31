import {useParams} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {TracksById} from "../../cache/CachesById.ts";
import TrackLogo from "../../components/images/TrackLogo.tsx";
import {Track as TrackModel, TrackConfig} from "../../models/Track.ts";
import PageTitle from "../../functions/strings/PageTitle.ts";
import useTabState from "../../hooks/useTabState.ts";
import SideMenu from "../../components/navigation/SideMenu.tsx";
import Footer from "../../components/navigation/Footer.tsx";
import TrackName from "../../functions/strings/TrackName.ts";
import TrackInfo from "./panels/Info.tsx";
import useFetchArray from "../../hooks/useFetchArray.ts";
import {Season} from "../../models/Season.ts";
import {useEffect, useState} from "react";
import useFetchObject from "../../hooks/useFetchObject.ts";
import TrackStatsMap from "./panels/Map.tsx";
import {TrackInfoModel} from "./TrackInfo.ts";
import {Paper} from "@mui/material";
import TrackConfigSelect from "./TrackConfigSelect.tsx";
import useIsMobile from "../../hooks/useIsMobile.ts";

const panels = ['info', 'map', 'usage']
const titleHeight = 85

export default function Track() {

    const {id} = useParams()

    const track = TracksById()[Number(id)]
    const trackName = TrackName(track.track_id)
    PageTitle(trackName)

    const [trackSeasonUsesUnsorted, usesLoading] = useFetchArray<Season>(`/api/track_season_uses?id=${id}`)
    const [trackConfigs, trackConfigsLoading] = useFetchArray<TrackConfig>(`/api/track_configs?package_id=${track.package_id}`)
    // const [trackOwners, _ownersLoading] = useFetchObject<number>(0, `/api/track_owners?id=${id}`)
    const [trackFirstRace, _] = useFetchObject<number>(0, `/api/track_first_race?id=${id}`)

    const [trackUses, setTrackUses] = useState<Season[]>([])

    const trackInfo: TrackInfoModel = {
        trackOwners: 0,
        trackFirstRace: trackFirstRace,
    }

    // Sort track uses by race week on load
    useEffect(() => {

        if (usesLoading) return

        trackSeasonUsesUnsorted.sort((a, b) => (a.series_id < b.series_id) ? -1 : (b.series_id < a.series_id) ? 1 : 0)
        trackSeasonUsesUnsorted.sort((a, b) => (a.race_week_num < b.race_week_num) ? -1 : (b.race_week_num < a.race_week_num) ? 1 : 0)
        trackSeasonUsesUnsorted.sort((a, b) => (a.season_year < b.season_year) ? -1 : (b.season_year < a.season_year) ? 1 : 0)
        trackSeasonUsesUnsorted.sort((a, b) => (a.season_quarter < b.season_quarter) ? -1 : (b.season_quarter < a.season_quarter) ? 1 : 0)

        setTrackUses(trackSeasonUsesUnsorted)
    }, [usesLoading])

    const [tab, setTab] = useTabState(panels)

    const isMobile = useIsMobile()

    return <Box>
        <Grid container>
            <Grid xs={0} md={1}>
                <SideMenu initialTab={tab} panels={panels} onChange={value => setTab(value)}/>
            </Grid>
            <Grid xs={12} md mt={1}>
                <Container maxWidth="xl">

                    <Paper>
                        <Box mt={1} mb={2} p={1}
                             display={ isMobile ? 'block' : 'flex' }
                             width={'100%'}
                             justifyContent={'center'}
                        >

                            <Box
                                height={ isMobile ? undefined : titleHeight }
                                my={ isMobile ? 1 : 0}
                                display='flex'
                                justifyContent={'center'}
                            >
                                <TrackLogo width={120} link={track.logo}/>
                            </Box>

                            <Box
                                ml={ isMobile ? 0 : 2 }
                                display="flex"
                                justifyContent="center"
                                flexDirection="row"
                                alignItems="center"
                                textAlign="center"
                                height={ isMobile ? undefined : `${titleHeight}px` }
                            >
                                <Typography variant="h5" fontWeight="bold" fontFamily='Verdana'>
                                    {track.track_name}
                                </Typography>

                            </Box>

                            <TrackConfigSelect
                                trackId={id}
                                trackConfigs={trackConfigs}
                                trackConfigsLoading={trackConfigsLoading}
                            />
                        </Box>
                    </Paper>

                    <SideMenu initialTab={tab} mobile panels={panels} onChange={value => setTab(value)}/>
                    <Tabs
                        tab={tab}
                        track={track}
                        trackUses={trackUses}
                        usesLoading={usesLoading}
                        trackInfo={trackInfo}
                    />
                </Container>
            </Grid>

            <Footer/>
        </Grid>
    </Box>
}

type TabProps = {
    tab: number
    track: TrackModel
    trackUses: Season[]
    usesLoading: boolean
    trackInfo: TrackInfoModel
}

function Tabs(props: TabProps) {
    switch (props.tab) {
        case 0: {
            return <TrackInfo track={props.track} trackUses={props.trackUses} loading={props.usesLoading} trackInfo={props.trackInfo}/>
        }
        case 1: {
            return <TrackStatsMap id={props.track.track_id}/>
        }
        default: {
            return <></>
        }
    }
}
