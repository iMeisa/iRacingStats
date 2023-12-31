import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import TrackLogo from "../../../components/images/TrackLogo.tsx";
import CategoryLogo from "../../../functions/img/CategoryLogo.tsx";
import ElapsedTime from "../../../functions/datetime/ElapsedTime.ts";
import FormatCompactNumber from "../../../functions/numbers/FormatCompactNumber.ts";
import StatsGrid from "../../../components/data/DataGrid.tsx";

const columns: GridColDef[] = [
    {
        field: 'track_logo',
        headerName: 'Track',
        width: 75,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <TrackLogo link={params.value} />,
        sortable: false,
        headerAlign: 'center',
        filterable: false,
    },
    {
        width: 50,
        field: 'license_category_id',
        headerName: '',
        sortable: false,
        align: 'center',
        filterable: false,
        renderCell: params =>
            CategoryLogo(params.value, 0)

    },
    {
        flex: 1,
        minWidth: 400,
        field: 'track_name',
        headerName: '',
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
    // {
    //     flex: 1,
    //     minWidth: 125,
    //     field: 'best_avg',
    //     headerName: 'Best Avg Lap',
    //     headerAlign: 'center',
    //     align: 'center',
    //     renderCell: params =>
    //         LapTime(params.value)
    // },
    // {
    //     flex: 1,
    //     minWidth: 100,
    //     field: 'lap_record',
    //     headerName: 'Lap Record',
    //     headerAlign: 'center',
    //     align: 'center',
    //     renderCell: params =>
    //         LapTime(params.value)
    // },
    {
        flex: 1,
        minWidth: 100,
        field: 'inc_avg',
        headerName: 'Inc Avg',
        headerAlign: 'center',
        align: 'center',
        type: 'number',
        filterable: false,
        renderCell: params => params.value.toFixed(2)
    },
    {
        flex: 1,
        minWidth: 100,
        field: 'finish_total',
        headerName: 'Avg Finish',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        renderCell: params =>
            (params.value / params.row.races).toFixed(2)
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

export default function UserTracks(props: {stats: Record<string, unknown>[], loading: boolean}) {

    columns.map((c) => {
        c.hideSortIcons = true
    })

    return <StatsGrid
        columns={columns}
        rows={props.stats}
    />
}
