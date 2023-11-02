import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {LinearProgress} from "@mui/material";
import useFetch from "../../hooks/useFetch.ts";
import DefaultLogo from "../../components/images/DefaultLogo.tsx";

const columns: GridColDef[] = [
    {
        field: 'logo',
        headerName: 'logo',
        width: 75,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            params.value === '' ?
                DefaultLogo(60) :
                <img src={"https://images-static.iracing.com"+params.value}  alt="logo"  width={60}/>,
        sortable: false,
        headerAlign: 'center',
        align: 'right'
    },
    {
        field: 'car_name',
        headerName: 'Car Name',
        flex: 1,
        minWidth: 200,
    },
    {
        field: 'free_with_subscription',
        type: 'boolean',
        headerName: 'Free',
        flex: 1,
    },
];

export default function CarTable() {

    const [rows, loading] =
        useFetch('/api/cars?rows=500',
            (obj: Record<string, unknown>): Record<string, unknown> => {
                obj['id'] = obj['car_id']

                return obj
            })

    return <DataGrid
        slots={{
            loadingOverlay: LinearProgress,
        }}
        loading={loading}
        rows={rows}
        columns={columns}
        initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 10 },
            },

            sorting: {
                sortModel: [{field: 'car_name', sort: 'asc'}],
            },
        }}
        pageSizeOptions={[10]}
    />
}
