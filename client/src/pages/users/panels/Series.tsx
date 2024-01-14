import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import CategoryLogo from "../../../functions/img/CategoryLogo.tsx";
import StatsGrid from "../../../components/data/StatsGrid.tsx";
import SeriesLogo from "../../../components/images/SeriesLogo.tsx";

const columns: GridColDef[] = [
    {
        field: 'series_logo',
        headerName: 'Track',
        width: 76,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <SeriesLogo link={params.value} />,
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
        field: 'series_name',
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
        type: 'number',
        filterable: false,
        renderCell: params => params.value.toFixed(2)
    },
    {
        flex: 1,
        minWidth: 100,
        field: 'finish_avg',
        headerName: 'Avg Finish',
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        renderCell: params => params.value.toFixed(2)
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

export default function UserSeries(props: {stats: Record<string, unknown>[], loading: boolean}) {

    columns.map((c) => {
        c.hideSortIcons = true
    })

    return <StatsGrid
        columns={columns}
        rows={props.stats}
    />
}
