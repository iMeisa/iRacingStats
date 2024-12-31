import {TrackSeasonUse} from "../../../models/Track.ts";
import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {CircularProgress, useTheme} from "@mui/material";
import useIsMobile from "../../../hooks/useIsMobile.ts";
import Typography from "@mui/material/Typography";

type UsageProps = {
    seasonUses: TrackSeasonUse[]
    loading: boolean
}
export default function Usage(props: UsageProps) {

    const data = props.seasonUses

    const isMobile = useIsMobile()

    const theme = useTheme()

    return <>
        { props.loading ?
            <CircularProgress/>:
            data.length < 1 ?
                <Typography variant={'h5'} >Never used</Typography> :
                <ResponsiveContainer width="98%" height={250}>
                    <BarChart data={data}>
                        <XAxis
                            dataKey="season_label"
                            angle={-20}
                            minTickGap={0}
                            tickMargin={10}
                            interval={'preserveStartEnd'}
                        />
                        <YAxis hide={isMobile} width={35}/>
                        <Bar
                            dataKey={'count'}
                            fill={'#82ca9d'}
                            radius={[10, 10, 0, 0]}
                        />
                        <Tooltip
                            contentStyle={{backgroundColor: theme.palette.background.paper, borderRadius: 10}}
                            itemStyle={{ color: 'inherit' }}
                            cursor={{ opacity: 0.15 }}
                            animationDuration={100}
                            separator={': '}
                        />
                    </BarChart>
                </ResponsiveContainer>
        }
    </>
}
