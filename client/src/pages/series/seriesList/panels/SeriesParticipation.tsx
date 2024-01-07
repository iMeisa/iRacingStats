import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell} from 'recharts';
import Box from "@mui/material/Box";
import {LicenseColor, LicenseSecondaryColor, LicenseTertiaryColor} from "../../../../functions/img/LicenseColor.ts";
import useMediaQuery from "@mui/material/useMediaQuery";

export type SeriesPop = {
    id: number,
    category: string,
    category_id: number,
    min_license_level: number,
    name: string,
    session_count: number,
    subsession_count: number,
    total_entry_count: number,
}

const dataHeight = 75

export default function SeriesParticipation(props: {series: SeriesPop[]}) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const data = props.series
    data.sort((a,b) =>
        (a.total_entry_count < b.total_entry_count) ? 1 : ((b.total_entry_count < a.total_entry_count) ? -1 : 0));

    return <>
        <ResponsiveContainer width="99%" height={data.length * dataHeight}>
            <BarChart data={data} layout="vertical">
                <XAxis type="number" hide={true}/>
                <YAxis width={150} type="category" dataKey="name"/>
                <Bar dataKey="total_entry_count" fill="#8884d8" layout="vertical" radius={[0, 10, 10, 0]}>
                    {data.map((entry, index) =>
                        <Cell
                            key={`cell-${index}`}
                            fill={
                                prefersDarkMode ?
                                LicenseColor(entry['min_license_level'] as number) :
                                LicenseSecondaryColor(entry['min_license_level'] as number)
                            }
                            stroke={LicenseTertiaryColor(entry['min_license_level'] as number)}
                        />
                    )}
                </Bar>
                <Tooltip/>
            </BarChart>
        </ResponsiveContainer>
        <Box my={10}/>
    </>
}
