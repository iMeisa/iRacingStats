import { GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import ElapsedTime from "../../../functions/datetime/ElapsedTime.ts";
import FormatCompactNumber from "../../../functions/numbers/FormatCompactNumber.ts";
import CarLogo from "../../../components/images/CarLogo.tsx";
import StatsGrid from "../../../components/data/grid/StatsGrid.tsx";

const columns: GridColDef[] = [
    {
        field: 'car_logo',
        headerName: 'Car.ts',
        width: 75,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <CarLogo link={params.value} />,
        sortable: false,
        headerAlign: 'center',
        filterable: false,
    },
    {
        flex: 1,
        minWidth: 300,
        field: 'car_name',
        headerName: '',
        type: 'string',
    },
    {
        flex: 1,
        minWidth: 75,
        field: 'races',
        headerName: 'Races',
        headerAlign: 'center',
        align: 'center',
        type: 'number',
    },
    {
        flex: 1,
        minWidth: 75,
        field: 'wins',
        headerName: 'Wins',
        headerAlign: 'center',
        align: 'center',
        type: 'number',
    },
    {
        flex: 1,
        minWidth: 80,
        field: 'podiums',
        headerName: 'Podiums',
        headerAlign: 'center',
        align: 'center',
        type: 'number',
    },
    {
        flex: 1,
        minWidth: 100,
        field: 'race_time',
        headerName: 'Race Time',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
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
        type: 'number',
    },
    {
        flex: 1,
        minWidth: 100,
        field: 'laps_lead',
        headerName: 'Laps Lead',
        headerAlign: 'center',
        align: 'center',
        type: 'number',
    },
    {
        flex: 1,
        minWidth: 100,
        field: 'inc_avg',
        headerName: 'Inc Avg',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        renderCell: params => params.value.toFixed(2)
    },
    {
        flex: 1,
        minWidth: 150,
        field: 'distance_mi',
        headerName: 'Distance',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        renderCell: params =>
            `${FormatCompactNumber(params.row.distance_km)} km (${FormatCompactNumber(params.row.distance_mi)} mi)`
    },
    {
        width: 50,
        field: 'id',
        headerName: 'ID',
        headerAlign: 'right',
        align: 'right',
        type: 'number',
    },

];

export default function UserCars(props: {stats: Record<string, unknown>[], loading: boolean}) {

    columns.map((c) => {
        c.hideSortIcons = true
    })

    return <StatsGrid
        columns={columns}
        rows={props.stats}
        loading={props.loading}
    />
}
