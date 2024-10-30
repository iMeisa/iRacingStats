import TrackMap from "../../../components/images/TrackMap.tsx";
import useWindowSize from "../../../hooks/useWindowSize.ts";

type MapProps = {
    id: number
}

export default function TrackStatsMap(props: MapProps) {

    const [_width, height] = useWindowSize()

    return <TrackMap id={props.id} size={height * 0.7} border/>
}
