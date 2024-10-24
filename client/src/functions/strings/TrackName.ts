import {TracksById} from "../../cache/CachesById.ts";

export default function TrackName(trackId: number): string {

    const track = TracksById()[trackId]
    if (track === undefined) return ''

    return track.config_name.length < 1 ?
        track.track_name :
        `${track.track_name} - ${track.config_name}`
}
