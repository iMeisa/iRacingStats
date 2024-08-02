import {Link} from "react-router-dom";
import SeriesLogo from "../../../components/images/SeriesLogo.tsx";
import CategoryLogo from "../../../functions/img/CategoryLogo.tsx";
import {Tooltip} from "@mui/material";
import {UnixToDateTime} from "../../../functions/datetime/UnixToDate.ts";
import StatsGrid from "../../../components/data/grid/StatsGrid.tsx";
import PositionTrophy from "../../../components/images/PositionTrophy.tsx";
import ColoredValue from "../../../components/data/ColoredValue.tsx";
import {DriverRace} from "../../../models/driver/Race.ts";
import {GridCol} from "../../../components/data/grid/models/GridCol.ts";
import BoolIcon from "../../../components/data/BoolIcon.tsx";
import UnixTimeAgo from "../../../components/data/UnixTimeAgo.tsx";
import CarLogo from "../../../components/images/CarLogo.tsx";
import TrackLogo from "../../../components/images/TrackLogo.tsx";

const columns: GridCol<any, any>[] = [
    {
        key: 'end',
        name: 'Time Ago',
        hideName: true,
        filterable: false,
        width: 60,
        align: 'right',
        renderCell: params => <UnixTimeAgo unixStamp={params.row.end_time} mini/>
    },
    {
        key: 'adjusted_position',
        name: 'Pos',
        width: 80,
        renderCell: params => params.row.finish_position_in_class < 3 ?
            <PositionTrophy position={params.row.finish_position_in_class}/> :
            params.row.adjusted_position,
        type: 'number',
    },
    {
        key: 'series_logo',
        name: 'Series',
        width: 80,
        headerAlign: 'left',
        renderCell: params =>
            <Link to={`/series/${params.row.series_id}`}>
                <SeriesLogo link={params.row.series_logo} />
            </Link>,
        sortable: false,
        filterable: false,
    },
    {
        width: 50,
        minWidth: 40,
        key: 'category_id',
        name: 'License Category',
        hideName: true,
        sortable: false,
        filterable: false,  // Temporary
        type: 'singleSelect',
        renderCell: params =>
            CategoryLogo(params.row.category_id, params.row.min_license_level, 30)

    },
    {
        key: 'series_short_name',
        name: 'Series Name',
        hideName: true,
        align: 'left',
        minWidth: 300,
        // width: 300,
        resizable: true,
        type: 'string',
        renderCell: params =>
            <Tooltip title="Subsession Results" disableInteractive>
                <Link
                    style={{ textDecoration: 'underline', fontStyle: 'italic', color: 'inherit', fontWeight: 'bold'}}
                    to={`/subsession/${params.row.subsession_id}`}
                >
                    {params.row.series_short_name}
                </Link>
            </Tooltip>
    },
    {
        key: 'event_strength_of_field',
        name: 'SOF',
        width: 80,
        type: 'number',
    },
    {
        key: 'sr_change',
        name: 'SR',
        width: 80,
        filterable: false,
        type: 'number',
        renderCell: params =>
            <ColoredValue value={params.row.sr_change} decimals={2} positiveIsGood={true}/>
    },
    {
        key: 'ir_change',
        name: 'iRating',
        width: 80,
        type: 'number',
        renderCell: params =>
            <ColoredValue value={params.row.ir_change} positiveIsGood={true}/>
    },
    {
        key: 'end_time',
        name: 'End Time',
        width: 175,
        filterable: false,
        type: 'number',
        renderCell: params => UnixToDateTime(params.row.end_time)
    },
    {
        key: 'incidents',
        name: 'Inc',
        width: 80,
        type: 'number',
        renderCell: params => `${params.row.incidents}x`
    },
    {
        key: 'dnf',
        name: 'DNF',
        width: 80,
        type: "boolean",
        renderCell: params => <BoolIcon value={params.row.dnf} positiveValue={false}/>
    },
    {
        key: 'car_name',
        name: 'Car',
        width: 80,
        type: 'string',
        renderCell: params =>
            <Tooltip title={params.row.car_name} disableInteractive>
                <span>
                    <CarLogo link={params.row.car_logo}/>
                </span>
            </Tooltip>
    },
    {
        key: 'track',
        name: 'Track',
        width: 80,
        // minWidth: 350,
        resizable: true,
        type: 'string',

        renderCell: params =>
            <Tooltip title={params.row.track} disableInteractive>
                <span>
                    <TrackLogo link={params.row.track_logo}/>
                </span>
            </Tooltip>
    },
];

export default function UserRaces(props: {results: DriverRace[], loading: boolean}) {

    return <StatsGrid
        id={'driver-races'}
        columns={columns}
        rows={props.results}
        loading={props.loading}
        rowName={'races'}
    />
}
