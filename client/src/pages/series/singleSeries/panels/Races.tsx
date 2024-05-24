import {Link} from "react-router-dom";
import {Tooltip} from "@mui/material";
import {UnixToDateTime, UnixToTime} from "../../../../functions/datetime/UnixToDate.ts";
import Button from "@mui/material/Button";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import StatsGrid from "../../../../components/data/grid/StatsGrid.tsx";
import {GridCol} from "../../../../components/data/grid/models/GridCol.ts";
import UnixTimeAgo from "../../../../components/data/UnixTimeAgo.tsx";
import {Session} from "../../../../models/Session.ts";

const columns: GridCol<any, any>[] = [
    {
        key: 'time_ago',
        name: '',
        width: 175,
        headerAlign: 'center',
        align: 'center',
        renderCell: params => <UnixTimeAgo unixStamp={params.row.end_time}/>
    },
    {
        key: 'id',
        name: 'Splits Button',
        hideName: true,
        headerAlign: 'center',
        minWidth: 100,
        renderCell: params =>
            <Tooltip title="Subsession Results">
                <Link
                    to={`/sessions/${params.row.session_id}`}
                >
                    <Button variant="contained" size="small" startIcon={<FormatListNumberedIcon/>} >
                        Splits
                    </Button>
                </Link>
            </Tooltip>
    },
    {
        key: 'race_week_num',
        name: 'Week #',
        type: 'number',
    },
    {
        key: 'subsession_count',
        name: 'Splits',
        headerAlign: 'center',
        align: 'center',
        type: 'number',
    },
    {
        key: 'entry_count',
        name: 'Entries',
        type: "number",
    },
    {
        key: 'start_time',
        name: 'Start Time',
        width: 175,
        headerAlign: 'center',
        align: 'center',
        renderCell: params => UnixToDateTime(params.row.start_time)
    },
    {
        key: 'end_time',
        name: 'End Time',
        width: 100,
        headerAlign: 'center',
        align: 'center',
        renderCell: params => UnixToTime(params.row.end_time)
    },
    {
        key: 'track',
        name: 'Track',
        minWidth: 300,
    }
];

export default function Races(props: {results: Session[], loading: boolean}) {
    return <StatsGrid
        id='series-races'
        loading={props.loading}
        columns={columns}
        rows={props.results}
        height={0.6}
    />
}
