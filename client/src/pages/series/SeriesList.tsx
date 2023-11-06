import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
} from "@mui/x-data-grid";
import useFetch from "../../hooks/useFetch.ts";
import {LinearProgress, Tooltip} from "@mui/material";
import DefaultLogo from "../../components/images/DefaultLogo.tsx";
import ToTitle from "../../functions/strings/Title.ts";
import CategoryLogo from "../../functions/img/CategoryLogo.tsx";
import "./SeriesList.css"

const columns: GridColDef[] = [
    {
        field: 'logo',
        headerName: 'Series',
        width: 75,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            params.value === '' ?
                DefaultLogo(50) :
                <img src={"https://images-static.iracing.com/img/logos/series/"+params.value}  alt="logo" width={65}/>,
        sortable: false,
        headerAlign: 'center',
    },
    {
        width: 50,
        field: 'category_id',
        headerName: '',
        sortable: false,
        align: 'center',
        renderCell: params =>
            <Tooltip title={params.row.category}>
                {CategoryLogo(params.value, params.row.min_license_level)}
            </Tooltip>

    },
    { field: 'name', headerName: '', flex: 1, minWidth: 300},
    // { field: 'category', headerName: 'Category', flex: 1},
    // { field: 'sr_change', headerName: 'Avg SR Change', flex: 1},
    { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', flex: 0},
];

export default function SeriesList() {

    const [rows, loading] =
        useFetch('/api/series', obj => {
            obj['category'] = ToTitle(obj['category'] as string)
            // obj['sr_change'] = Number(Number(obj['sr_change']).toFixed(2))
            return obj
        })

    // TODO: Fetch sr change separately

    return <>
        <h2>Series List</h2>
        <DataGrid
            // autoHeight
            slots={{
                loadingOverlay: LinearProgress,
            }}
            loading={loading}

            columns={columns}
            rows={rows}

            initialState={{

                pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                },

                sorting: {
                    sortModel: [{field: 'series_short_name', sort: 'asc'}],
                },

            }}

            pageSizeOptions={[10]}

            // onPaginationModelChange={handlePaginationData}
        />
    </>
}
