import {useEffect, useState} from "react";

import {DataGrid, GridColDef, GridRenderCellParams,} from '@mui/x-data-grid';
import './Races.css'
import {LinearProgress} from "@mui/material";
import CurrentUrl from "../../variables/Url.ts";
import {Link} from "react-router-dom";
import CategoryLogo from "../../functions/img/CategoryLogo.tsx";
import SeriesLogo from "../../components/images/SeriesLogo.tsx";
import Container from "@mui/material/Container";

const columns: GridColDef[] = [
    {
        field: 'series_logo',
        headerName: 'Series',
        width: 75,
        renderCell: (params: GridRenderCellParams<any, string>) => <SeriesLogo link={params.value}/>,
        sortable: false,
        headerAlign: 'center',
    },
    {
        width: 50,
        field: 'category_id',
        headerName: '',
        sortable: false,
        align: 'center',
        renderCell: params =>
            CategoryLogo(params.value, params.row.min_license_level)

    },
    {
        field: 'series_short_name',
        headerName: '',
        headerAlign: 'center',
        minWidth: 350,
        flex: 1,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <Link
                style={{ textDecoration: 'underline', fontStyle: 'italic', color: 'inherit', fontWeight: 'bold'}}
                to={`/sessions/${params.row.id}`}
            >
                {params.value}
            </Link>
    },
    { field: 'subsession_count', headerName: 'Splits', width: 70, align: 'center', headerAlign: 'center' },
    { field: 'end_time', headerName: '', hideable: true },
    { field: 'end_time_formatted', headerName: 'End Time', width: 115, headerAlign: 'center', align: 'center' },
    { field: 'track', headerName: 'Track', flex: 1, minWidth: 200 },
];



export default function Races() {

    const emptyRows: Record<string, unknown>[] = []
    const [rows, setRows] = useState(emptyRows);

    const [loading, setLoading] = useState(true)

    // Column defaults
    columns.map((col) => {
        col.hideSortIcons = true
        col.sortable = false
        // col.headerClassName = 'data-header'
    })

    // Fetch sessions
    useEffect(() => {

        setLoading(true)
        const url = `${CurrentUrl()}/api/sessions`
        // console.log(url)
        fetch(url)
            .then((response) => response.json())
            .then((data: Record<string, unknown>[]) => {
                console.log(data)

                // Data formatting here
                data.map(function (obj: Record<string, unknown>): Record<string, unknown> {

                    // Format time to JS datetime
                    const start_date = new Date( obj['end_time'] as number * 1000 )
                    obj['end_time_formatted'] = start_date.toLocaleTimeString()

                    return obj
                })

                setRows(rows.concat(data))

                setLoading(false)
            })
    }, [])

    return (
        <>
            <h2>Races</h2>
            <p style={{color: 'darkgray'}}>Last 24 Hours</p>
            {/*<h1>💀</h1>*/}
            {/*<h1 className={"fuelvine-ad"}>DOWNLOAD FUELVINE NOW!!!!!!!!!!!!!!!!!!!!!!</h1>*/}

            <Container maxWidth="xl">
                <DataGrid
                    // autoHeight
                    slots={{
                        loadingOverlay: LinearProgress,
                    }}
                    loading={loading}
                    sx={{color: 'inherit'}}
                    disableColumnMenu={true}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },

                        sorting: {
                            sortModel: [{field: 'end_time', sort: 'desc'}],
                        },

                        columns: {
                            columnVisibilityModel: {
                                end_time: false
                            }
                        }
                    }}
                    pageSizeOptions={[10]}
                />
            </Container>
        </>
    )
}

// function changeRows(model: GridPaginationModel, rowCount: number): boolean {
//     const totalPages = rowCount / model.pageSize
//     const pagesLeft = totalPages - model.page
//
//     console.log(pagesLeft)
//
//     return pagesLeft <= 1;
// }
