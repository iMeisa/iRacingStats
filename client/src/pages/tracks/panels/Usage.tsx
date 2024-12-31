import {TrackSeasonUse} from "../../../models/Track.ts";

type UsageProps = {
    seasonUses: TrackSeasonUse[]
    loading: boolean
}
export default function Usage(props: UsageProps) {

    return <>

        {props.seasonUses.map((use) =>
            <p>{use.season_year} - {use.season_quarter}: {use.count}</p>
        )}
    </>
}
