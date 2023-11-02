import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import useFetch from "../../hooks/useFetch.ts";
import {LinearProgress} from "@mui/material";
import DefaultLogo from "../../components/images/DefaultLogo.tsx";

const columns: GridColDef[] = [
    {
        field: 'series_logo',
        headerName: 'Series',
        width: 75,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            params.value === '' ?
                DefaultLogo(50) :
                <img src={"https://images-static.iracing.com/img/logos/series/"+params.value}  alt="logo" width={65}/>,
        sortable: false,
        headerAlign: 'center',
    },
    { field: 'series_short_name', headerName: '', flex: 1, minWidth: 300},
    { field: 'license_category_id', headerName: 'license', flex: 1},
    { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', flex: 0},
];

export default function SeriesList() {

    const [rows, loading] =
        useFetch('/api/series?rows=500',
            (obj: Record<string, unknown>): Record<string, unknown> => {
            obj['id'] = obj['series_id']

            return obj
    })

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
        />
    </>
}
