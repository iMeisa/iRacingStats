import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {LinearProgress} from "@mui/material";
import ElapsedTime from "../../../functions/datetime/ElapsedTime.ts";
import FormatCompactNumber from "../../../functions/numbers/FormatCompactNumber.ts";
import CarLogo from "../../../components/images/CarLogo.tsx";
// import LapTime from "../../../functions/datetime/LapTime.ts";
// import CategoryLogo from "../../../functions/img/CategoryLogo.tsx";

const columns: GridColDef[] = [
    {
        field: 'car_logo',
        headerName: 'Track',
        width: 75,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <CarLogo link={params.value} />,
        sortable: false,
        headerAlign: 'center',
    },
    {
        flex: 1,
        minWidth: 300,
        field: 'car_name',
        headerName: '',
    },
    {
        flex: 1,
        minWidth: 75,
        field: 'races',
        headerName: 'Races',
        headerAlign: 'center',
        align: 'center',
    },
    {
        flex: 1,
        minWidth: 75,
        field: 'wins',
        headerName: 'Wins',
        headerAlign: 'center',
        align: 'center',
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'podiums',
        headerName: 'Podiums',
        headerAlign: 'center',
        align: 'center',
    },
    {
        flex: 1,
        minWidth: 100,
        field: 'race_time',
        headerName: 'Race Time',
        headerAlign: 'center',
        align: 'center',
        renderCell: params =>
            ElapsedTime(params.value / 10)
    },
    {
        flex: 1,
        minWidth: 60,
        field: 'laps',
        headerName: 'Laps',
        headerAlign: 'center',
        align: 'center',
    },
    {
        flex: 1,
        minWidth: 100,
        field: 'laps_lead',
        headerName: 'Laps Lead',
        headerAlign: 'center',
        align: 'center',
    },
    {
        flex: 1,
        minWidth: 100,
        field: 'inc_avg',
        headerName: 'Inc Avg',
        headerAlign: 'center',
        align: 'center',
        renderCell: params => params.value.toFixed(2)
    },
    {
        flex: 1,
        minWidth: 150,
        field: 'distance_mi',
        headerName: 'Distance',
        headerAlign: 'center',
        align: 'center',
        renderCell: params =>
            `${FormatCompactNumber(params.row.distance_km)} km (${FormatCompactNumber(params.row.distance_mi)} mi)`
    },
    {
        width: 50,
        field: 'id',
        headerName: 'ID',
        headerAlign: 'right',
        align: 'right',
    },

];

export default function UserCars(props: {stats: Record<string, unknown>[], loading: boolean}) {

    columns.map((c) => {
        c.hideSortIcons = true
    })

    return <DataGrid
        slots={{
            loadingOverlay: LinearProgress,
        }}
        loading={props.loading}
        sx={{
            maxHeight: '75vh',
        }}
        // autoHeight
        columns={columns}
        rows={props.stats}
        disableColumnMenu
        initialState={{
            sorting: {
                sortModel: [{field: 'end_time', sort: 'desc'}],
            }
        }}
        pageSizeOptions={[]}
    />
}
