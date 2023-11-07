import {Link, useParams} from "react-router-dom";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {LinearProgress, Skeleton} from "@mui/material";
import CurrentUrl from "../../variables/Url.ts";
import "./Sessions.css"
import Button from "@mui/material/Button";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

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
    {
        field: 'results',
        headerName: '',
        headerAlign: 'center',
        align: 'center',
        width: 125,
        renderCell: (params) =>
            <Link to={`/subsession/${params.row.id}`}>
                <Button variant="contained" size="small" startIcon={<FormatListNumberedIcon/>} >Results</Button>
            </Link>
    },
    { field: 'split', headerName: '', headerAlign: 'center', align: 'center', width: 20 },
    { field: 'strength_of_field', headerName: 'SOF', flex: 1, headerAlign: 'center', align: 'center', minWidth: 70},
    { field: 'field_size', headerName: 'Field Size', flex: 1, headerAlign: 'center', align: 'center', minWidth: 100 },
    { field: 'average_lap', headerName: 'Average Lap', flex: 1, headerAlign: 'center', align: 'center', minWidth: 125 },
    { field: 'lead_changes', headerName: 'Lead Changes', flex: 1, headerAlign: 'center', align: 'center', minWidth: 125 },
    { field: 'cautions', headerName: 'Cautions', flex: 1, headerAlign: 'center', align: 'center', minWidth: 90, hideable: true },
    { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'right'},
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

                // setTimeout(() => {
                //     setRows(data)
                //     setLoading(false)
                // }, 2000)
            })
    }, [])

    return (
        <>
            <div style={{ marginTop: 20 }}>
                <div className={"centered"}>
                    {/*<LoadingImage*/}
                    {/*    width={200}*/}
                    {/*    height={100}*/}
                    {/*    url={"https://images-static.iracing.com/img/logos/series/"}*/}
                    {/*    endpoint={session.series_logo as string}*/}
                    {/*/>*/}
                    { loading ? (
                        <>
                            <Skeleton className={"centered logo"} variant="rounded" width={200} height={100} />
                            <Skeleton className={"centered"} variant="text" sx={{ fontSize: '1.5rem', width: '20vw' }}/>
                        </>
                    ) : (
                        <>
                            <img
                                className={"session-logo"}
                                src={"https://images-static.iracing.com/img/logos/series/"+session.series_logo}
                                alt="logo"
                                loading="lazy"
                            />
                            <h3>{session.series_name as string}</h3>
                        </>
                    )}
                </div>
                <DataGrid

                    slots={{
                        loadingOverlay: LinearProgress,
                    }}
                    autoHeight
                    loading={loading}
                    rows={rows}
                    columns={columns}
                    disableColumnMenu={true}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10]}
                />
            </div>
            {/*<h1>HELLO PUNY HUMAN</h1>*/}
            {/*<h1>{id}</h1>*/}
        </>
    )
}
