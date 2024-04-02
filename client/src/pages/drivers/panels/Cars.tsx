import ElapsedTime from "../../../functions/datetime/ElapsedTime.ts";
import FormatCompactNumber from "../../../functions/numbers/FormatCompactNumber.ts";
import CarLogo from "../../../components/images/CarLogo.tsx";
import StatsGrid from "../../../components/data/grid/StatsGrid.tsx";
import {GridCol} from "../../../components/data/grid/models/GridCol.ts";

const columns: GridCol<any, any>[] = [
    {
        key: 'car_logo',
        name: 'Car',
        width: 75,
        renderCell: params =>
            <CarLogo link={params.row.car_logo} />,
        sortable: false,
        // headerAlign: 'center',
        filterable: false,
    },
    {
        // flex: 1,
        minWidth: 300,
        key: 'car_name',
        name: '',
        // type: 'string',
    },
    {
        // flex: 1,
        minWidth: 75,
        key: 'races',
        name: 'Races',
        // headerAlign: 'center',
        align: 'center',
        // type: 'number',
    },
    {
        // flex: 1,
        minWidth: 75,
        key: 'wins',
        name: 'Wins',
        // headerAlign: 'center',
        align: 'center',
        // type: 'number',
    },
    {
        // flex: 1,
        minWidth: 80,
        key: 'podiums',
        name: 'Podiums',
        // headerAlign: 'center',
        align: 'center',
        // type: 'number',
    },
    {
        // flex: 1,
        minWidth: 100,
        key: 'race_time',
        name: 'Race Time',
        // headerAlign: 'center',
        align: 'center',
        filterable: false,
        renderCell: params =>
            ElapsedTime(params.row.race_time / 10)
    },
    {
        // flex: 1,
        minWidth: 60,
        key: 'laps',
        name: 'Laps',
        // headerAlign: 'center',
        align: 'center',
        // type: 'number',
    },
    {
        // flex: 1,
        minWidth: 100,
        key: 'laps_lead',
        name: 'Laps Lead',
        // headerAlign: 'center',
        align: 'center',
        // type: 'number',
    },
    {
        // flex: 1,
        minWidth: 100,
        key: 'inc_avg',
        name: 'Inc Avg',
        // headerAlign: 'center',
        align: 'center',
        filterable: false,
        renderCell: params => params.row.inc_avg.toFixed(2)
    },
    {
        // flex: 1,
        minWidth: 150,
        key: 'distance_mi',
        name: 'Distance',
        // headerAlign: 'center',
        align: 'center',
        filterable: false,
        renderCell: params =>
            `${FormatCompactNumber(params.row.distance_km)} km (${FormatCompactNumber(params.row.distance_mi)} mi)`
    },
    {
        width: 50,
        key: 'id',
        name: 'ID',
        // headerAlign: 'right',
        align: 'right',
        // type: 'number',
    },

];

export default function UserCars(props: {stats: Record<string, unknown>[], loading: boolean}) {

    return <StatsGrid
        columns={columns}
        rows={props.stats}
        loading={props.loading}
    />
}
