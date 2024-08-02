import {Link} from "react-router-dom";
import SeriesLogo from "../../../../components/images/SeriesLogo.tsx";
import CategoryLogo from "../../../../functions/img/CategoryLogo.tsx";
import StatsGrid from "../../../../components/data/grid/StatsGrid.tsx";
import {GridCol} from "../../../../components/data/grid/models/GridCol.ts";
import BoolIcon from "../../../../components/data/BoolIcon.tsx";
import {Series} from "../../../../models/Series.ts";

const columns: GridCol<any, any>[] = [
    {
        key: 'series_logo',
        name: 'Series',
        width: 75,
        renderCell: params =>
            <Link to={`/series/${params.row.series_id}`}>
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
        filterable: false,
        align: 'center',
        renderCell: params =>
                CategoryLogo(params.row.license_category_id, params.row.min_license_level, 30)

    },
    {
        key: 'series_short_name',
        name: 'Series Name',
        hideName: true,
        minWidth: 300,
        type: 'string',
        renderCell: params =>
            <Link
                style={{ textDecoration: 'underline', fontStyle: 'italic', color: 'inherit', fontWeight: 'bold'}}
                to={`/series/${params.row.series_id}`}
            >
                {params.row.series_short_name}
            </Link>
    },
    {
        key: 'active',
        name: 'Active',
        align: 'center',
        width: 80,
        type: "boolean",
        renderCell: params => <BoolIcon value={params.row.active} positiveValue={true} />
    },
    {
        key: 'official',
        name: 'Official',
        align: 'center',
        width: 80,
        type: "boolean",
        renderCell: params => <BoolIcon value={params.row.official} positiveValue={true} />
    },
    {
        key: 'fixed_setup',
        name: 'Fixed',
        align: 'center',
        width: 80,
        type: "boolean",
        renderCell: params => <BoolIcon value={params.row.fixed_setup} positiveValue={true} />
    },
    {
        key: 'series_id',
        name: 'ID',
        align: 'center',
        type: 'number'
    },
];

type SeriesTableProps = {
    series: Series[],
}

export default function SeriesTable(props: SeriesTableProps) {
    return <StatsGrid
        id={'series-list'}
        columns={columns}
        rows={props.series}
        rowName={'series'}
    />
}
