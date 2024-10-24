import {useParams} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import {useEffect} from "react";
import {TracksById} from "../../cache/CachesById.ts";
import TrackLogo from "../../components/images/TrackLogo.tsx";
import {Track as TrackModel} from "../../models/Track.ts";
import PageTitle from "../../functions/strings/PageTitle.ts";
import useTabState from "../../hooks/useTabState.ts";
import SideMenu from "../../components/navigation/SideMenu.tsx";
import Footer from "../../components/navigation/Footer.tsx";
import TrackName from "../../functions/strings/TrackName.ts";
import TrackInfo from "./panels/Info.tsx";

const panels = ['info', 'usage']
const titleHeight = 80

export default function Track() {

    const {id} = useParams()

    const track = TracksById()[Number(id)]
    const trackName = TrackName(track.track_id)

    const [tab, setTab] = useTabState(panels)

    PageTitle(trackName)

    console.log(track)

    return <Box>
        <Grid container>
            <Grid xs={0} md={1}>
                <SideMenu initialTab={tab} panels={panels} onChange={value => setTab(value)}/>
            </Grid>
            <Grid xs={12} md mt={1}>
                <Container maxWidth="xl">

                    <Box mt={1} mb={2} display='flex' width={'100%'}>

                        <Box height={titleHeight}>
                            <TrackLogo width={120} link={track.logo}/>
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
                                {trackName}
                            </Typography>
                        </Box>
                    </Box>

                    <SideMenu initialTab={tab} mobile panels={panels} onChange={value => setTab(value)}/>
                    <Tabs
                        tab={tab}
                        track={track}
                    />
                </Container>
            </Grid>

            <Footer/>
        </Grid>
    </Box>
}

type TabProps = {
    tab: number
    track: TrackModel,
}

function Tabs(props: TabProps) {
    switch (props.tab) {
        case 0: {
            return <TrackInfo track={props.track}/>
        }
        default: {
            return <></>
        }
    }
}
