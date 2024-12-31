import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Box from "@mui/material/Box";
import {LicenseColor, LicenseSecondaryColor, LicenseTertiaryColor} from "../../../../functions/img/LicenseColor.ts";
import {CircularProgress, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {Link, useNavigate} from "react-router-dom";

export type SeriesPop = {
    id: number,
    logo: string,
    category: string,
    category_id: number,
    min_license_level: number,
    name: string,
    session_count: number,
    subsession_count: number,
    total_entry_count: number,
    track: string,
}

const dataHeight = 75
const seriesLogoUrl = "https://images-static.iracing.com/img/logos/series/"

function sortedData(data: SeriesPop[]): Record<number, SeriesPop> {
    let indexedData: Record<number, SeriesPop> = {}
    for (const datum of data) {
        indexedData[datum.id] = datum
    }

    return indexedData
}

const seriesLogo = (props: any, dataById: Record<number, SeriesPop>) => {
    const { x, y, payload } = props
    const seriesId = payload.value

    const seriesLogo = seriesLogoUrl + dataById[seriesId].logo
    // console.log(seriesLogo)
    const imgHeight = dataHeight / 1.5

    return (
        <Link to={`/series/${seriesId}`}>
            <g>
                <title>hello</title>
                <image
                    xlinkHref={seriesLogo}
                    x={x - 100}
                    y={y - imgHeight / 2}
                    height={imgHeight}
                    width={100}
                />
            </g>
        </Link>
    )
}

function CustomTooltip(props: { tooltipData: any, dataById: Record<number, SeriesPop>}) {
    const { label } = props.tooltipData

    const series = props.dataById[label as number]

    return series === undefined ?
        <Paper>null</Paper> :
        <Paper
        sx={{
            p: 3,
        }}
        elevation={6}
    >
        <Typography variant="subtitle1" fontWeight="bold">{series.name}</Typography>
        <Typography variant="subtitle1" fontWeight="bold">{series.track}</Typography>

        <Grid container width="10em" mx="auto" mt={1}>
            <Grid xs={6} justifyContent="flex-end">
                <Typography variant="body1" >
                    Splits Avg:
                </Typography>
                <Typography variant="body1">
                    Entry Avg:
                </Typography>
            </Grid>

            <Grid xs={6}>
                <Typography variant="body1" fontWeight="bold">
                    <strong>{(series.subsession_count / series.session_count).toFixed(2)}</strong>
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    <strong>{(series.total_entry_count / series.session_count).toFixed(2)}</strong>
                </Typography>
            </Grid>
        </Grid>

    </Paper>
}

type SeriesParticipationProps = {
    series: SeriesPop[],
    loading: boolean,
}

export default function SeriesParticipation(props: SeriesParticipationProps) {
    const navigate = useNavigate()

    const [focusBar, setFocusBar] = useState(null)

    const data = props.series
    const dataById = sortedData(data)
    data.sort((a,b) =>
        (a.total_entry_count < b.total_entry_count) ? 1 : ((b.total_entry_count < a.total_entry_count) ? -1 : 0));

    return <>
        {/*<UnderConstructionChip/>*/}
        <br/>
        { props.loading ?
            <CircularProgress sx={{ width: '99%', mt: 2 }}/> :
            <ResponsiveContainer width="99%" height={data.length * dataHeight}>
                <BarChart data={data} layout="vertical">
                    <XAxis type="number" hide={true}/>
                    <YAxis
                        width={105}
                        type="category"
                        dataKey="id"
                        // hide={true}
                        interval={0}
                        tick={(props) => seriesLogo(props, dataById)}
                    />
                    <Bar
                        dataKey="total_entry_count"
                        fill="#8884d8"
                        layout="vertical"
                        radius={[0, 10, 10, 0]}
                        onMouseMove={(state) => {
                            setFocusBar(state.id)
                        }}
                        onMouseLeave={() => setFocusBar(null)}
                        onClick={(props) => navigate(`/series/${props.id}`)}
                    >
                        {data.map((entry, index) =>
                            <Cell
                                key={`cell-${index}`}
                                fill={ focusBar === entry.id ?
                                    LicenseSecondaryColor(entry.min_license_level) :
                                    LicenseColor(entry.min_license_level)
                                }
                                stroke={LicenseTertiaryColor(entry.min_license_level)}
                            />
                        )}
                    </Bar>
                    <Tooltip
                        content={
                            (props) =>
                                <CustomTooltip tooltipData={props} dataById={dataById}/>
                        }
                        cursor={{
                            fill: 'grey',
                            fillOpacity: 0.05,
                        }}
                    />
                </BarChart>
            </ResponsiveContainer>
        }
        <Box my={10}/>
    </>
}
