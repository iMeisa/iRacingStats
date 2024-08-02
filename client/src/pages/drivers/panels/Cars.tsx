import ElapsedTime from "../../../functions/datetime/ElapsedTime.ts";
import FormatCompactNumber from "../../../functions/numbers/FormatCompactNumber.ts";
import CarLogo from "../../../components/images/CarLogo.tsx";
import StatsGrid from "../../../components/data/grid/StatsGrid.tsx";
import {GridCol} from "../../../components/data/grid/models/GridCol.ts";
import Typography from "@mui/material/Typography";

const columns: GridCol<any, any>[] = [
    {
        key: 'car_logo',
        name: 'Car',
        width: 75,
        renderCell: params =>
            <CarLogo link={params.row.car_logo} />,
        sortable: false,
        filterable: false,
    },
    {
        minWidth: 300,
        key: 'car_name',
        name: 'Car Name',
        hideName: true,
        type: 'string',
        align: 'left',
        renderCell: params =>
            <Typography
                style={{
                    color: 'inherit',
                    fontWeight: 'bold'
                }}
            >
                {params.row.car_name}
            </Typography>
    },
    {
        minWidth: 75,
        key: 'races',
        name: 'Races',
        align: 'center',
        type: 'number',
    },
    {
        minWidth: 75,
        key: 'wins',
        name: 'Wins',
        align: 'center',
        type: 'number',
    },
    {
        minWidth: 80,
        key: 'podiums',
        name: 'Podiums',
        align: 'center',
        type: 'number',
    },
    {
        minWidth: 100,
        key: 'race_time',
        name: 'Race Time',
        align: 'center',
        filterable: false,
        type: 'number',
        renderCell: params =>
            ElapsedTime(params.row.race_time / 10)
    },
    {
        minWidth: 60,
        key: 'laps',
        name: 'Laps',
        align: 'center',
        type: 'number',
    },
    {
        minWidth: 100,
        key: 'laps_lead',
        name: 'Laps Lead',
        align: 'center',
        type: 'number',
    },
    {
        minWidth: 100,
        key: 'inc_avg',
        name: 'Inc Avg',
        filterable: false,
        align: 'center',
        type: 'number',
        renderCell: params => params.row.inc_avg.toFixed(2)
    },
    {
        minWidth: 150,
        key: 'distance_mi',
        name: 'Distance',
        align: 'center',
        filterable: false,
        type: 'number',
        renderCell: params =>
            `${FormatCompactNumber(params.row.distance_km)} km (${FormatCompactNumber(params.row.distance_mi)} mi)`
    },
    {
        width: 50,
        key: 'id',
        name: 'ID',
        align: 'right',
        type: 'number',
    },

];

export default function UserCars(props: {stats: Record<string, unknown>[], loading: boolean}) {

    return <StatsGrid
        id={'driver-cars'}
        columns={columns}
        rows={props.stats}
        loading={props.loading}
        rowName={'cars'}
    />
}
