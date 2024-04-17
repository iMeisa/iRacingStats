import CategoryLogo from "../../../functions/img/CategoryLogo.tsx";
import StatsGrid from "../../../components/data/grid/StatsGrid.tsx";
import SeriesLogo from "../../../components/images/SeriesLogo.tsx";
import {GridCol} from "../../../components/data/grid/models/GridCol.ts";

const columns: GridCol<any, any>[] = [
    {
        key: 'series_logo',
        name: 'Series',
        width: 76,
        renderCell: params =>
            <SeriesLogo link={params.row.series_logo} />,
        sortable: false,
        // headerAlign: 'center',
        filterable: false,
    },
    {
        width: 50,
        key: 'license_category_id',
        name: 'License Category',
        hideName: true,
        sortable: false,
        align: 'center',
        filterable: false,
        renderCell: params =>
            CategoryLogo(params.row.license_category_id, 0)

    },
    {
        // flex: 1,
        width: 400,
        key: 'series_name',
        name: 'Series Name',
        hideName: true,
    },
    {
        // flex: 1,
        minWidth: 75,
        key: 'races',
        name: 'Races',
        // headerAlign: 'center',
        align: 'center',
        type: 'number',
    },
    {
        // flex: 1,
        minWidth: 75,
        key: 'wins',
        name: 'Wins',
        // headerAlign: 'center',
        align: 'center',
        type: 'number',
    },
    {
        // flex: 1,
        minWidth: 80,
        key: 'podiums',
        name: 'Podiums',
        // headerAlign: 'center',
        align: 'center',
        type: 'number',
    },
    {
        // flex: 1,
        minWidth: 60,
        key: 'laps',
        name: 'Laps',
        // headerAlign: 'center',
        align: 'center',
        type: 'number',
    },
    {
        // flex: 1,
        minWidth: 100,
        key: 'laps_lead',
        name: 'Laps Lead',
        // headerAlign: 'center',
        align: 'center',
        type: 'number',
    },
    {
        // flex: 1,
        minWidth: 100,
        key: 'inc_avg',
        name: 'Inc Avg',
        // headerAlign: 'center',
        align: 'center',
        type: 'number',
        filterable: false,
        renderCell: params => params.row.inc_avg.toFixed(2)
    },
    {
        // flex: 1,
        minWidth: 100,
        key: 'finish_avg',
        name: 'Avg Finish',
        // headerAlign: 'center',
        align: 'center',
        filterable: false,
        renderCell: params => params.row.finish_avg.toFixed(2)
    },
    {
        width: 50,
        key: 'id',
        name: 'ID',
        // headerAlign: 'right',
        align: 'right',
        type: 'number',
    },

];

export default function UserSeries(props: {stats: Record<string, unknown>[], loading: boolean}) {
    return <StatsGrid
        columns={columns}
        rows={props.stats}
        loading={props.loading}
    />
}
