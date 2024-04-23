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

const columns: GridCol<any, any>[] = [
    {
        key: 'adjusted_position',
        name: 'Pos',
        // hideName: true,
        width: 80,
        // headerAlign: 'center',
        // align: 'center',
        renderCell: params => params.row.finish_position_in_class < 3 ?
            <PositionTrophy position={params.row.finish_position_in_class}/> :
            params.row.adjusted_position,
        type: 'number',
    },
    {
        width: 40,
        minWidth: 40,
        key: 'category_id',
        name: 'License Category',
        hideName: true,
        sortable: false,
        // align: 'left',
        filterable: false,  // Temporary
        // resizable: true,
        type: 'singleSelect',
        renderCell: params =>
            CategoryLogo(params.row.category_id, params.row.min_license_level, 30)

    },
    {
        key: 'series_logo',
        name: 'Series',
        width: 100,
        renderCell: params =>
            <Link to={`/series/${params.row.series_id}`}>
                <SeriesLogo link={params.row.series_logo} />
            </Link>,
        sortable: false,
        filterable: false,
        // headerAlign: 'center',
    },
    {
        key: 'series_short_name',
        name: 'Series Name',
        hideName: true,
        // headerAlign: 'center',
        align: 'left',
        minWidth: 300,
        // width: 300,
        // flex: 1,
        resizable: true,
        type: 'string',
        renderCell: params =>
            <Tooltip title="Subsession Results">
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
        // filterable: false,
        // headerAlign: 'center',
        // align: 'center',
        type: 'number',
    },
    {
        key: 'sr_change',
        name: 'SR',
        // flex: 1,
        width: 80,
        // align: 'center',
        // headerAlign: 'center',
        filterable: false,
        type: 'number',
        renderCell: params =>
            <ColoredValue value={params.row.sr_change} decimals={2} positiveIsGood={true}/>
    },
    {
        key: 'ir_change',
        name: 'iRating',
        // flex: 1,
        width: 80,
        // align: 'center',
        // headerAlign: 'center',
        type: 'number',
        renderCell: params =>
            <ColoredValue value={params.row.ir_change} positiveIsGood={true}/>
    },
    {
        key: 'end_time',
        name: 'End Time',
        width: 175,
        // headerAlign: 'center',
        // align: 'center',
        filterable: false,
        type: 'number',
        renderCell: params => UnixToDateTime(params.row.end_time)
    },
    // { key: 'track', name: 'Track', flex: 1, minWidth: 200 },
    {
        key: 'incidents',
        name: 'Inc',
        // flex: 1,
        width: 80,
        type: 'number',
        renderCell: params => `${params.row.incidents}x`
    },
    {
        key: 'dnf',
        name: 'DNF',
        // flex: 1,
        width: 80,
        type: "boolean",
        renderCell: params => <BoolIcon value={params.row.dnf} positiveValue={false}/>
    },
    {
        key: 'track',
        name: 'Track',
        // flex: 1,
        width: 350,
        resizable: true,
        type: 'string',
    }
];

export default function UserRaces(props: {results: DriverRace[], loading: boolean}) {

    return <StatsGrid
        columns={columns}
        rows={props.results}
        loading={props.loading}
        // initialState={{
        //     sorting: {
        //         sortModel: [{key: 'end_time', sort: 'desc'}],
        //     }
        // }}
    />
}
