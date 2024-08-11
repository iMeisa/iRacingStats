import CategoryLogo from "../../../functions/img/CategoryLogo.tsx";
import StatsGrid from "../../../components/data/grid/StatsGrid.tsx";
import SeriesLogo from "../../../components/images/SeriesLogo.tsx";
import {GridCol} from "../../../components/data/grid/models/GridCol.ts";
import {Link} from "react-router-dom";

const columns: GridCol<any, any>[] = [
    {
        key: 'series_logo',
        name: 'Series',
        width: 76,
        renderCell: params =>
            <Link to={`/series/${params.row.id}`}>
                <SeriesLogo link={params.row.series_logo} />
            </Link>,
        sortable: false,
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
            CategoryLogo(params.row.license_category_id, params.row.min_license_level)

    },
    {
        // flex: 1,
        width: 400,
        key: 'series_name',
        name: 'Series Name',
        hideName: true,
        align: 'left',
        renderCell: params =>
            <Link
                style={{ textDecoration: 'underline', fontStyle: 'italic', color: 'inherit', fontWeight: 'bold'}}
                to={`/series/${params.row.id}`}
            >
                {params.row.series_name}
            </Link>
    },
    {
        minWidth: 75,
        key: 'races',
        name: 'Races',
        align: 'center',
        type: 'number',
    },
    {
        minWidth: 75,
        key: 'wins',
        name: 'Wins',
        align: 'center',
        type: 'number',
    },
    {
        minWidth: 80,
        key: 'podiums',
        name: 'Podiums',
        align: 'center',
        type: 'number',
    },
    {
        minWidth: 60,
        key: 'laps',
        name: 'Laps',
        align: 'center',
        type: 'number',
    },
    {
        minWidth: 100,
        key: 'laps_lead',
        name: 'Laps Lead',
        align: 'center',
        type: 'number',
    },
    {
        minWidth: 100,
        key: 'inc_avg',
        name: 'Inc Avg',
        align: 'center',
        type: 'number',
        filterable: false,
        renderCell: params => params.row.inc_avg.toFixed(2)
    },
    {
        minWidth: 100,
        key: 'finish_avg',
        name: 'Avg Finish',
        align: 'center',
        filterable: false,
        type: 'number',
        renderCell: params => params.row.finish_avg.toFixed(2)
    },
    {
        width: 50,
        key: 'id',
        name: 'ID',
        align: 'right',
        type: 'number',
    },

];

export default function UserSeries(props: {stats: Record<string, unknown>[], loading: boolean}) {
    return <StatsGrid
        id={'driver-series'}
        columns={columns}
        rows={props.stats}
        loading={props.loading}
        rowName={'series'}
    />
}
