import useFetchArray from "../../hooks/useFetchArray.ts";
import CarLogo from "../../components/images/CarLogo.tsx";
import StatsGrid from "../../components/data/grid/StatsGrid.tsx";
import {GridCol} from "../../components/data/grid/models/GridCol.ts";

const columns: GridCol<any, any>[] = [
    {
        key: 'logo',
        name: '',
        width: 75,
        renderCell: params => <CarLogo link={params.row.logo as string}/>,
        sortable: false,
        filterable: false,
        // headerAlign: 'center',
        align: 'right'
    },
    {
        key: 'car_name',
        name: 'Car Name',
        // flex: 1,
        minWidth: 200,
    },
    {
        key: 'free_with_subscription',
        type: 'boolean',
        name: 'Free',
        // flex: 1,
    },
];

// const handleLogoLoad = (id: number) => {
//     // @ts-ignore
//     document.getElementById(`logo-skeleton-${id}`).style.display = 'none'
//     // @ts-ignore
//     document.getElementById(`logo-${id}`).style.display = 'block'
// }

export default function CarTable() {

    const [rows, loading] =
        useFetchArray('/api/cars?rows=500',
            (obj: Record<string, unknown>): Record<string, unknown> => {
                obj['id'] = obj['car_id']

                return obj
            })

    return <StatsGrid
        loading={loading}
        rows={rows}
        columns={columns}
    />
}
