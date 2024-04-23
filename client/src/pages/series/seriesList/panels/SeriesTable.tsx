import {Link} from "react-router-dom";
import SeriesLogo from "../../../../components/images/SeriesLogo.tsx";
import {Tooltip} from "@mui/material";
import CategoryLogo from "../../../../functions/img/CategoryLogo.tsx";
import StatsGrid from "../../../../components/data/grid/StatsGrid.tsx";
import {GridCol} from "../../../../components/data/grid/models/GridCol.ts";
import BoolIcon from "../../../../components/data/BoolIcon.tsx";

const columns: GridCol<any, any>[] = [
    {
        key: 'logo',
        name: 'Series',
        width: 75,
        renderCell: params =>
            <Link to={`/series/${params.row.id}`}>
                <SeriesLogo link={params.row.logo} />
            </Link>,
        sortable: false,
        filterable: false,
        // headerAlign: 'center',
    },
    {
        width: 50,
        key: 'category_id',
        name: 'License Category',
        hideName: true,
        sortable: false,
        filterable: false,
        align: 'center',
        renderCell: params =>
            <Tooltip title={params.row.category}>
                {CategoryLogo(params.row.category_id, params.row.min_license_level)}
            </Tooltip>

    },
    {
        key: 'name',
        name: 'Series Name',
        hideName: true,
        // flex: 1,
        minWidth: 300,
        type: 'string',
        renderCell: params =>
            <Link
                style={{ textDecoration: 'underline', fontStyle: 'italic', color: 'inherit', fontWeight: 'bold'}}
                to={`/series/${params.row.id}`}
            >
                {params.row.name}
            </Link>
    },
    // { key: 'category', name: 'Category', flex: 1},
    // { key: 'sr_change', name: 'Avg SR Change', flex: 1},
    {
        key: 'active',
        name: 'Active',
        // headerAlign: 'center',
        align: 'center',
        width: 125,
        type: "boolean",
        renderCell: params => <BoolIcon value={params.row.active} positiveValue={true} />
    },
    {
        key: 'id',
        name: 'ID',
        // headerAlign: 'center',
        align: 'center',
        // flex: 0,
        type: 'number'
    },
];

type SeriesTableProps = {
    series: Record<string, unknown>[],
    loading: boolean
}

export default function SeriesTable(props: SeriesTableProps) {
    return <StatsGrid
        id={'series-list'}
        loading={props.loading}
        columns={columns}
        rows={props.series}
    />
}
