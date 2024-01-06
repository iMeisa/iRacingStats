import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Box from "@mui/material/Box";

const dataHeight = 75

export default function SeriesParticipation(props: {series: Record<string, unknown>[]}) {
    const data = props.series.filter(series => series['active'] === true)


    return <>
        <ResponsiveContainer width="99%" height={data.length * dataHeight}>
            <BarChart width={150} height={40} data={data} layout="vertical">
                <XAxis type="number" hide={true}/>
                <YAxis width={150} type="category" dataKey="name"/>
                <Bar dataKey="id" fill="#8884d8" layout="vertical"/>
                <Tooltip/>
            </BarChart>
        </ResponsiveContainer>
        <Box my={10}/>
    </>
}
