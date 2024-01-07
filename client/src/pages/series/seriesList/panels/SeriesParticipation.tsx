import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell} from 'recharts';
import Box from "@mui/material/Box";
import {LicenseTertiaryColor} from "../../../../functions/img/LicenseColor.ts";

const dataHeight = 75

export default function SeriesParticipation(props: {series: Record<string, unknown>[]}) {
    const data = props.series.filter(series => series['active'] === true)


    return <>
        <ResponsiveContainer width="99%" height={data.length * dataHeight}>
            <BarChart width={150} height={40} data={data} layout="vertical">
                <XAxis type="number" hide={true}/>
                <YAxis width={150} type="category" dataKey="name"/>
                <Bar dataKey="id" fill="#8884d8" layout="vertical">
                    {data.map((entry, index) =>
                        <Cell key={`cell-${index}`} fill={LicenseTertiaryColor(entry['min_license_level'] as number)}/>
                    )}
                </Bar>
                <Tooltip/>
            </BarChart>
        </ResponsiveContainer>
        <Box my={10}/>
    </>
}
