import TrackLogo from "../../../components/images/TrackLogo.tsx";
import CategoryLogo from "../../../functions/img/CategoryLogo.tsx";
import ElapsedTime from "../../../functions/datetime/ElapsedTime.ts";
import FormatCompactNumber from "../../../functions/numbers/FormatCompactNumber.ts";
import StatsGrid from "../../../components/data/grid/StatsGrid.tsx";
import {GridCol} from "../../../components/data/grid/models/GridCol.ts";

const columns: GridCol<any, any>[] = [
    {
        key: 'track_logo',
        name: 'Track',
        width: 76,
        renderCell: params =>
            <TrackLogo link={params.row.track_logo} />,
        sortable: false,
        // headerAlign: 'center',
        filterable: false,
    },
    {
        width: 50,
        key: 'license_category_id',
        name: 'License Category',
        hideName: true,
        sortable: false,
        align: 'center',
        filterable: false,
        renderCell: params =>
            CategoryLogo(params.row.license_category_id, 0)

    },
    {
        // flex: 1,
        minWidth: 400,
        key: 'track_name',
        name: 'Track Name',
        hideName: true,
        type: 'string',
        align: 'left',
    },
    {
        // flex: 1,
        minWidth: 75,
        key: 'races',
        name: 'Races',
        // headerAlign: 'center',
        align: 'center',
        type: 'number',
    },
    {
        // flex: 1,
        minWidth: 75,
        key: 'wins',
        name: 'Wins',
        // headerAlign: 'center',
        align: 'center',
        type: 'number',
    },
    {
        // flex: 1,
        minWidth: 80,
        key: 'podiums',
        name: 'Podiums',
        // headerAlign: 'center',
        align: 'center',
        type: 'number',
    },
    {
        // flex: 1,
        minWidth: 100,
        key: 'race_time',
        name: 'Race Time',
        // headerAlign: 'center',
        align: 'center',
        filterable: false,
        type: 'number',
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
        type: 'number',
    },
    {
        // flex: 1,
        minWidth: 100,
        key: 'laps_lead',
        name: 'Laps Lead',
        // headerAlign: 'center',
        align: 'center',
        type: 'number',
    },
    {
        // flex: 1,
        minWidth: 100,
        key: 'inc_avg',
        name: 'Inc Avg',
        // headerAlign: 'center',
        align: 'center',
        type: 'number',
        filterable: false,
        renderCell: params => params.row.inc_avg.toFixed(2)
    },
    {
        // flex: 1,
        minWidth: 100,
        key: 'finish_avg',
        name: 'Avg Finish',
        // headerAlign: 'center',
        align: 'center',
        filterable: false,
        type: 'number',
        renderCell: params =>
            params.row.finish_avg.toFixed(2)
    },
    {
        // flex: 1,
        minWidth: 150,
        key: 'distance_mi',
        name: 'Distance',
        // headerAlign: 'center',
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
        // headerAlign: 'right',
        align: 'right',
        type: 'number',
    },

];

export default function UserTracks(props: {stats: Record<string, unknown>[], loading: boolean}) {
    return <StatsGrid
        id={'driver-tracks'}
        columns={columns}
        rows={props.stats}
        loading={props.loading}
    />
}
