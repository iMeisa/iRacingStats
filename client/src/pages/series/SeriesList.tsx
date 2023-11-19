import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
} from "@mui/x-data-grid";
import useFetch from "../../hooks/useFetch.ts";
import {LinearProgress, Tooltip} from "@mui/material";
import ToTitle from "../../functions/strings/Title.ts";
import CategoryLogo from "../../functions/img/CategoryLogo.tsx";
import "./SeriesList.css"
import SeriesLogo from "../../components/images/SeriesLogo.tsx";
import Container from "@mui/material/Container";
import {Link} from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize.ts";
import useIsMobile from "../../hooks/useIsMobile.ts";

const columns: GridColDef[] = [
    {
        field: 'logo',
        headerName: 'Series',
        width: 75,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <Link to={`/series/${params.row.id}`}>
                <SeriesLogo link={params.value} />
            </Link>,
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
            <Tooltip title={params.row.category}>
                {CategoryLogo(params.value, params.row.min_license_level)}
            </Tooltip>

    },
    {
        field: 'name',
        headerName: '',
        flex: 1,
        minWidth: 300,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <Link
                style={{ textDecoration: 'underline', fontStyle: 'italic', color: 'inherit', fontWeight: 'bold'}}
                to={`/series/${params.row.id}`}
            >
                {params.value}
            </Link>
    },
    // { field: 'category', headerName: 'Category', flex: 1},
    // { field: 'sr_change', headerName: 'Avg SR Change', flex: 1},
    { field: 'active', headerName: 'Active', headerAlign: 'center', align: 'center', width: 125, type: "boolean"},
    { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center', flex: 0},
];

export default function SeriesList() {

    const [rows, loading] =
        useFetch('/api/series', obj => {
            obj['category'] = ToTitle(obj['category'] as string)
            // obj['sr_change'] = Number(Number(obj['sr_change']).toFixed(2))
            return obj
        })

    const isMobile = useIsMobile()

    // TODO: Fetch sr change separately

    return <>
        <h2>Series List</h2>
        <Container maxWidth="xl">
            <DataGrid
                // autoHeight
                slots={{
                    loadingOverlay: LinearProgress,
                }}
                loading={loading}
                columns={columns}
                rows={rows}
                disableColumnMenu={isMobile}
                initialState={{

                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },

                    sorting: {
                        sortModel: [{field: 'id', sort: 'asc'}],
                    },

                    filter: {
                        filterModel: {
                            items: [{field: 'active', operator: 'is', value: 'true'}]
                        }
                    },
                }}

                pageSizeOptions={[10]}

                // onPaginationModelChange={handlePaginationData}
            />
        </Container>
    </>
}
