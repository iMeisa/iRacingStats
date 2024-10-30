import {TracksById} from "../../cache/CachesById.ts";
import {Track} from "../../models/Track.ts";
import Box from "@mui/material/Box";
import './TrackMap.css'

type TrackMapProps = {
    id: number
    size?: number | string
    minimal?: boolean
    showActive?: boolean
}

let track: Track | undefined = undefined

export default function TrackMap(props: TrackMapProps) {

    const size: number | string =  props.size || '10em'
    const minimal: boolean = props.minimal || false
    const showActive: boolean = props.showActive || true

    track = TracksById()[props.id]

    return <Box className={'track-layer'} height={size} display="flex" justifyContent={'center'}>
        <img style={{ maxHeight: size }} src={!minimal ? trackLayer('background') : ''} alt={''}/>
        <img style={{ maxHeight: size }} src={trackLayer('inactive')} alt={''}/>
        <img style={{ maxHeight: size }} src={showActive ? trackLayer('active') : ''} alt={''}/>
        <img style={{ maxHeight: size }} src={!minimal ? trackLayer('pitroad') : ''} alt={''}/>
        <img style={{ maxHeight: size }} src={!minimal ? trackLayer('start-finish') : ''} alt={''}/>
        <img style={{ maxHeight: size }} src={!minimal ? trackLayer('turns') : ''} alt={''}/>
    </Box>

}

function trackLayer(layer: string): string {
    if (track === undefined) return ''
    return track.track_map + track.track_map_layers[layer]
}
