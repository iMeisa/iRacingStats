import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {Link} from "react-router-dom";
import SeriesLogo from "../../../../components/images/SeriesLogo.tsx";
import {Tooltip} from "@mui/material";
import CategoryLogo from "../../../../functions/img/CategoryLogo.tsx";
import StatsGrid from "../../../../components/data/StatsGrid.tsx";

const columns: GridColDef[] = [
    {
        field: 'logo',
        headerName: 'Series',
        width: 75,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <Link to={`/series/${params.row.id}`}>
                <SeriesLogo link={params.value} />
            </Link>,
        sortable: false,
        filterable: false,
        headerAlign: 'center',
    },
    {
        width: 50,
        field: 'category_id',
        headerName: '',
        sortable: false,
        filterable: false,
        align: 'center',
        renderCell: params =>
            <Tooltip title={params.row.category}>
                {CategoryLogo(params.value, params.row.min_license_level)}
            </Tooltip>

    },
    {
        field: 'name',
        headerName: '',
        flex: 1,
        minWidth: 300,
        type: 'string',
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <Link
                style={{ textDecoration: 'underline', fontStyle: 'italic', color: 'inherit', fontWeight: 'bold'}}
                to={`/series/${params.row.id}`}
            >
                {params.value}
            </Link>
    },
    // { field: 'category', headerName: 'Category', flex: 1},
    // { field: 'sr_change', headerName: 'Avg SR Change', flex: 1},
    { field: 'active', headerName: 'Active', headerAlign: 'center', align: 'center', width: 125, type: "boolean"},
    { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', flex: 0, type: 'number'},
];

type SeriesTableProps = {
    series: Record<string, unknown>[],
    loading: boolean
}

export default function SeriesTable(props: SeriesTableProps) {
    return <StatsGrid
        loading={props.loading}
        columns={columns}
        rows={props.series}
        initialState={{

            pagination: {
                paginationModel: { page: 0, pageSize: 10 },
            },

            sorting: {
                sortModel: [{field: 'id', sort: 'asc'}],
            },

            filter: {
                filterModel: {
                    items: [{field: 'active', operator: 'is', value: 'true'}]
                }
            },
        }}

        pageSizeOptions={[10]}

        // onPaginationModelChange={handlePaginationData}
    />
}
