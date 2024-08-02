import useFetchArray from "../hooks/useFetchArray.ts";
import StatsGrid from "../components/data/grid/StatsGrid.tsx";
import {GridCol} from "../components/data/grid/models/GridCol.ts";
import Container from "@mui/material/Container";

const columns: GridCol<any, any>[] = [
    {
        key: 'path',
        name: 'Page',
    },
    {
        key: 'hits',
        name: 'Hits',
        type: 'number',
    }
]

export default function AnalyticsPage() {
    const [hits, loading] = useFetchArray('/api/visits')

    console.log(hits)

    return <Container maxWidth="md">
        <StatsGrid
            id={'analytics'}
            loading={loading}
            columns={columns}
            rows={hits}
        />
    </Container>
}
