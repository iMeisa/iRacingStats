import TrackMap from "../../../components/images/TrackMap.tsx";
import useWindowSize from "../../../hooks/useWindowSize.ts";
import Container from "@mui/material/Container";
import useIsMobile from "../../../hooks/useIsMobile.ts";
import Typography from "@mui/material/Typography";

type MapProps = {
    id: number
}

export default function TrackStatsMap(props: MapProps) {

    const [_width, height] = useWindowSize()
    const isMobile = useIsMobile()

    return <Container maxWidth='xl' style={{  marginTop: 20 }}>
        <Typography display={isMobile ? 'block' : 'none'} variant={'caption'}>
            Recommended on desktop
        </Typography>
        <TrackMap id={props.id} size={height * 0.7} border/>
    </Container>
}
