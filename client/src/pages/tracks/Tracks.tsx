import useFetch from "../../hooks/useFetch.ts";
import {useEffect} from "react";
import Container from "@mui/material/Container";
import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import TrackLogo from "../../components/images/TrackLogo.tsx";
import CategoryLogo from "../../functions/img/CategoryLogo.tsx";
import StatsGrid from "../../components/data/StatsGrid.tsx";


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'right', width: 50, type: 'number'},
    {
        field: 'logo',
        headerName: '',
        width: 75,
        renderCell: (params: GridRenderCellParams<any, string>) => <TrackLogo link={params.value as string}/>,
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'right'
    },
    {
        width: 50,
        field: 'license_category_id',
        headerName: '',
        sortable: false,
        filterable: false,
        align: 'center',
        renderCell: params =>
            CategoryLogo(params.value, 0)

    },
    { field: 'track_name', headerName: 'Name', flex: 1, minWidth: 300},
    { field: 'config_name', headerName: 'Config', flex: 1, minWidth: 200},
];

export default function Tracks() {

    const [tracks, loading] = useFetch('/api/tracks?rows=500&retired=false',
            obj => {
        obj['id'] = obj['track_id']
        return obj
    })

    useEffect(() => {
        console.log(tracks)
    }, [tracks]);

    return <>

        <Container maxWidth="xl">
            <h2>Tracks</h2>
            <StatsGrid
                loading={loading}
                rows={tracks}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10]}
            />
        </Container>
    </>
}
