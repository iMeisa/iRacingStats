import {useEffect, useState} from "react";
import {GridColDef, GridRenderCellParams,} from '@mui/x-data-grid';
import './Races.css'
import {Tooltip} from "@mui/material";
import CurrentUrl from "../../variables/Url.ts";
import {Link} from "react-router-dom";
import CategoryLogo from "../../functions/img/CategoryLogo.tsx";
import SeriesLogo from "../../components/images/SeriesLogo.tsx";
import Container from "@mui/material/Container";
import StatsGrid from "../../components/data/StatsGrid.tsx";
import Typography from "@mui/material/Typography";

const columns: GridColDef[] = [
    {
        field: 'series_logo',
        headerName: 'Series',
        width: 75,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <Link to={`/series/${params.row.series_id}`}>
                <SeriesLogo link={params.value} />
            </Link>,
        sortable: false,
        filterable: false,
        headerAlign: 'center',
    },
    {
        width: 50,
        field: 'category_id',
        headerName: '',
        sortable: false,
        filterable: false,
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
            <Tooltip title="See splits">
                <Link
                    style={{ textDecoration: 'underline', fontStyle: 'italic', color: 'inherit', fontWeight: 'bold'}}
                    to={`/sessions/${params.row.id}`}
                >
                        {params.value}
                </Link>
            </Tooltip>
    },
    {
        field: 'subsession_count',
        headerName: 'Splits',
        width: 70,
        align: 'center',
        headerAlign: 'center',
        type: 'number'
    },
    { field: 'end_time', headerName: '', hideable: true, filterable: false },
    {
        field: 'end_time_formatted',
        headerName: 'End Time',
        width: 115,
        headerAlign: 'center',
        align: 'center',
        filterable: false
    },
    { field: 'track', headerName: 'Track', flex: 1, minWidth: 200 },
];



export default function Races() {

    const emptyRows: Record<string, unknown>[] = []
    const [rows, setRows] = useState(emptyRows);

    const [loading, setLoading] = useState(true)

    // Column defaults
    columns.map((col) => {
        col.hideSortIcons = true
        // col.sortable = false
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

                setRows(data)

                setLoading(false)
            })
    }, [])

    return (
        <>
            <Typography variant="h5" fontWeight="bold" mt={1}>Races</Typography>
            <p style={{color: 'darkgray'}}>Last 24 Hours</p>

            <Container maxWidth="xl">
                <StatsGrid
                    loading={loading}
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
