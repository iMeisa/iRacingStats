import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {LinearProgress} from "@mui/material";
import useFetch from "../../hooks/useFetch.ts";
import CarLogo from "../../components/images/CarLogo.tsx";

const columns: GridColDef[] = [
    {
        field: 'logo',
        headerName: '',
        width: 75,
        renderCell: (params: GridRenderCellParams<any, string>) => <CarLogo link={params.value as string}/>,
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

// const handleLogoLoad = (id: number) => {
//     // @ts-ignore
//     document.getElementById(`logo-skeleton-${id}`).style.display = 'none'
//     // @ts-ignore
//     document.getElementById(`logo-${id}`).style.display = 'block'
// }

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
