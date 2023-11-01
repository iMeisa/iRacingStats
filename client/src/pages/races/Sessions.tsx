import {useParams} from "react-router-dom";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {LinearProgress} from "@mui/material";
import CurrentUrl from "../../variables/Url.ts";

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
    { field: 'strength_of_field', headerName: 'Strength Of Field', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'field_size', headerName: 'Field Size', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'average_lap', headerName: 'Average Lap', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'lead_changes', headerName: 'Lead Changes', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'cautions', headerName: 'Cautions', flex: 1, headerAlign: 'center', align: 'center' },
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

    const [loading, setLoading] = useState(true)

    // Fetch session
    useEffect(() => {
        const url = `${CurrentUrl()}/api/session?session_id=${id}`
        fetch(url)
            .then((response) => response.json())
            .then((data: Record<string, unknown>[]) => {
                console.log(data)
                setSession(data[0])

                sortSubsessions(data)

                // Data formatting here
                data.map( function (obj: Record<string, unknown>, index): Record<string, unknown> {
                    // Add split numbers
                    obj["split"] = index+1

                    // Tenths of milliseconds to elapsed time
                    const date = new Date(0)
                    date.setMilliseconds(obj['average_lap'] as number / 10)
                    obj['average_lap'] = date.toISOString().substring(14, 23)

                    return obj
                })

                setRows(data)
                setLoading(false)
            })
    }, [])

    return (
        <>
            <div style={{marginTop: 20}}>
                <img src={"https://images-static.iracing.com/img/logos/series/"+session.series_logo}  alt="logo" height={150}/>
                <h3>{session.series_short_name as string}</h3>
                <div className={"data-grid"}>
                    <DataGrid
                        // sx={{color: 'white'}}
                        slots={{
                            loadingOverlay: LinearProgress,
                        }}
                        loading={loading}
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
