import {Season} from "../../../../models/Season.ts";
import StatsGrid from "../../../../components/data/grid/StatsGrid.tsx";
import {GridCol} from "../../../../components/data/grid/models/GridCol.ts";

const columns: GridCol<any, any>[] = [
    {
        key: 'season_name',
        name: 'Season Name',
    },
    {
        key: 'season_year',
        name: 'Year',
    },
    {
        key: 'season_quarter',
        name: 'Quarter',
    },
    // {
    //
    // }
]

type SeasonsProps = {
    seasons: Season[]
    seasons_loading: boolean
}

export default function Seasons(props: SeasonsProps) {

    props.seasons.sort((a, b) => b.season_quarter - a.season_quarter)
    props.seasons.sort((a, b) => b.season_year - a.season_year)

    return <StatsGrid
        id={'season-series'}
        columns={columns}
        rows={props.seasons}
        loading={props.seasons_loading}
    />
}
