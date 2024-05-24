import {TracksById} from "../../cache/CachesById.ts";

export default function TrackName(trackId: number): string {

    const track = TracksById()[trackId]
    if (track === undefined) return ''

    let trackName = track.track_name

    if (track.config_name.length > 0) {
        trackName += ' - ' + track.config_name
    }

    return trackName
}
