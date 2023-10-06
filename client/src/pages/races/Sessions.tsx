import {useParams} from "react-router-dom";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useEffect, useState} from "react";

function sortSubsessions(subsessions: Record<string, unknown>[]): Record<string, unknown>[] {
    subsessions.sort((a,b) => (b.event_strength_of_field as number) - (a.event_strength_of_field as number))
    return subsessions
}


const columns: GridColDef[] = [
    // {
    //     field: 'series_logo',
    //     headerName: '',
    //     minWidth: 75,
    //     renderCell: (params: GridRenderCellParams<any, string>) =>
    //         <img src={"https://images-static.iracing.com/img/logos/series/"+params.value}  alt="logo" minWidth={60}/>,
    //     sortable: false,
    // },
    { field: 'split', headerName: 'Split', headerAlign: 'center', align: 'center' },
    { field: 'event_strength_of_field', headerName: 'Strength Of Field', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'field_size', headerName: 'Field Size', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'average_lap', headerName: 'Average Lap', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'num_lead_changes', headerName: 'Lead Changes', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'num_cautions', headerName: 'Cautions', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'right'},
    // {
    //     field: 'series_short_name',
    //     headerName: 'Series',
    //     minWidth: 500,
    //     renderCell: (params: GridRenderCellParams<any, string>) =>
    //         <a style={{color: 'white'}} href={`/sessions/${params.row.id}`}>{params.value}</a>
    // },
    // { field: 'start_time', headerName: 'Start Time', minWidth: 200 },
    // { field: 'track_name', headerName: 'Track', minWidth: 300 },
    // { field: 'config_name', headerName: 'Config', minWidth: 300 },
];

export default function Sessions() {
    const {id} = useParams()

    const emptyRows: Record<string, unknown>[] = []
    const [rows, setRows] = useState(emptyRows);

    const emptySession: Record<string, unknown> = {}
    const [session, setSession] = useState(emptySession)

    // Fetch session
    useEffect(() => {
        fetch(`http://127.0.0.1:8080/api/subsessions_view?rows=100&session_id=${id}`)
            .then((response) => response.json())
            .then((data: Record<string, unknown>[]) => {
                console.log(data)
                setSession(data[0])
                // console.log(session)


                // let series_name = data[0].series_short_name as string
                // if (series_name === "Mission R Challenge - Fixed") {
                //     data[0]['series_short_name'] = series_name + "💀"
                // }

                sortSubsessions(data)

                // Data formatting here
                data.map( function (obj: Record<string, unknown>, index): Record<string, unknown> {
                    // Add split numbers
                    obj["split"] = index+1

                    // Rename 'subsession_id' to 'id'
                    obj['id'] = obj['subsession_id']
                    delete obj['subsession_id']

                    // Format time to JS date
                    const start_date = new Date( Date.parse(obj['start_time'] as string) )
                    obj['start_time'] = start_date.toLocaleString()

                    // Tenths of milliseconds to elapsed time
                    const date = new Date(0)
                    date.setMilliseconds(obj['event_average_lap'] as number / 10)
                    obj['average_lap'] = date.toISOString().substring(14, 23)

                    return obj
                })

                setRows(data)
            })
    }, [])

    return (
        <>
            <div style={{marginTop: 20}}>
                <img src={"https://images-static.iracing.com/img/logos/series/"+session.series_logo}  alt="logo" height={150}/>
                <h3>{session.series_short_name as string}</h3>
                <div className={"data-grid"}>
                    <DataGrid
                        sx={{color: 'white'}}
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[10, 25]}
                    />
                </div>

            </div>
            {/*<h1>HELLO PUNY HUMAN</h1>*/}
            {/*<h1>{id}</h1>*/}
        </>
    )
}
