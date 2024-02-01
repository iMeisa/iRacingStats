import {GridColDef} from "@mui/x-data-grid";
import {Link} from "react-router-dom";
import SeriesLogo from "../../../components/images/SeriesLogo.tsx";
import CategoryLogo from "../../../functions/img/CategoryLogo.tsx";
import {Tooltip} from "@mui/material";
import {UnixToDateTime} from "../../../functions/datetime/UnixToDate.ts";
import StatsGrid from "../../../components/data/grid/StatsGrid.tsx";
import PositionTrophy from "../../../components/images/PositionTrophy.tsx";
import ColoredValue from "../../../components/data/ColoredValue.tsx";

const columns: GridColDef[] = [
    {
        field: 'finish_position_in_class',
        headerName: 'Pos',
        width: 50,
        headerAlign: 'center',
        align: 'center',
        renderCell: params => <PositionTrophy position={params.value}/>,
        type: 'number',
    },
    {
        field: 'series_logo',
        headerName: 'Series',
        width: 75,
        renderCell: params =>
            <Link to={`/series/${params.row.series_id}`}>
                <SeriesLogo link={params.value} />
            </Link>,
        sortable: false,
        filterable: false,
        headerAlign: 'center',
    },
    {
        width: 50,
        field: 'license_category_id',
        headerName: '',
        sortable: false,
        align: 'center',
        filterable: false,
        renderCell: params =>
            CategoryLogo(params.value, params.row.min_license_level)

    },
    {
        field: 'series_short_name',
        headerName: '',
        headerAlign: 'center',
        minWidth: 350,
        flex: 1,
        type: 'string',
        renderCell: params =>
            <Tooltip title="Subsession Results">
                <Link
                    style={{ textDecoration: 'underline', fontStyle: 'italic', color: 'inherit', fontWeight: 'bold'}}
                    to={`/subsession/${params.row.subsession_id}`}
                >
                    {params.value}
                </Link>
            </Tooltip>
    },
    {
        field: 'event_strength_of_field',
        headerName: 'SOF',
        width: 75,
        headerAlign: 'center',
        align: 'center',
        type: 'number',
    },
    {
        field: 'sr_change',
        headerName: 'SR',
        flex: 1,
        minWidth: 75,
        align: 'center',
        headerAlign: 'center',
        type: 'number',
        renderCell: params =>
            <ColoredValue value={params.value} positiveIsGood={true}/>
    },
    {
        field: 'ir_change',
        headerName: 'iRating',
        flex: 1,
        minWidth: 75,
        align: 'center',
        headerAlign: 'center',
        type: 'number',
        renderCell: params =>
            <ColoredValue value={params.value} positiveIsGood={true}/>
    },
    {
        field: 'end_time',
        headerName: 'End Time',
        width: 175,
        headerAlign: 'center',
        align: 'center',
        filterable: false,
        renderCell: params => UnixToDateTime(params.value)
    },
    // { field: 'track', headerName: 'Track', flex: 1, minWidth: 200 },
    {
        field: 'incidents',
        headerName: 'Inc',
        flex: 1,
        minWidth: 50,
        type: 'number',
        renderCell: params => `${params.value}x`
    },
    {
        field: 'dnf',
        headerName: 'DNF',
        flex: 1,
        minWidth: 50,
        type: "boolean",
    },
    {
        field: 'track',
        headerName: 'Track',
        flex: 1,
        minWidth: 300,
        type: 'string',
    }
];

export default function UserRaces(props: {results: Record<string, unknown>[], loading: boolean}) {
    return <StatsGrid
        columns={columns}
        rows={props.results}
        loading={props.loading}
        initialState={{
            sorting: {
                sortModel: [{field: 'end_time', sort: 'desc'}],
            }
        }}
    />
}
