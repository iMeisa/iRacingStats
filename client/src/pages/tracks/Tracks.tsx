import useFetchArray from "../../hooks/useFetchArray.ts";
import {useEffect} from "react";
import Container from "@mui/material/Container";
import TrackLogo from "../../components/images/TrackLogo.tsx";
import CategoryLogo from "../../functions/img/CategoryLogo.tsx";
import StatsGrid from "../../components/data/grid/StatsGrid.tsx";
import {GridCol} from "../../components/data/grid/models/GridCol.ts";


const columns: GridCol<any, any>[] = [
    {
        key: 'id',
        name: 'ID',
        // headerAlign: 'center',
        align: 'right',
        width: 50,
        type: 'number'
    },
    {
        key: 'logo',
        name: '',
        width: 75,
        renderCell: params => <TrackLogo link={params.row.logo as string}/>,
        sortable: false,
        filterable: false,
        // headerAlign: 'center',
        align: 'right'
    },
    {
        width: 50,
        key: 'license_category_id',
        name: '',
        sortable: false,
        filterable: false,
        align: 'center',
        renderCell: params =>
            CategoryLogo(params.row.license_category_id, 0)

    },
    {
        key: 'track_name',
        name: 'Name',
        // flex: 1,
        minWidth: 300
    },
    {
        key: 'config_name',
        name: 'Config',
        // flex: 1,
        minWidth: 200
    },
];

export default function Tracks() {

    const [tracks, loading] = useFetchArray('/api/tracks?rows=500&retired=false',
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
                id={'track-list'}
                loading={loading}
                rows={tracks}
                columns={columns}
            />
        </Container>
    </>
}
