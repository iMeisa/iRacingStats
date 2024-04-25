import {Link, useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import useFetchArray from "../../../hooks/useFetchArray.ts";
import {SyntheticEvent, useEffect, useState} from "react";
import {DefaultSubsession, Subsession as SubsessionModel} from "../../../models/Subsession.ts";
import LapTime from "../../../functions/datetime/LapTime.ts";
import {Accordion, AccordionDetails, AccordionSummary, Tooltip} from "@mui/material";
import SubsessionInfo from "./SubsessionInfo.tsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CarLogo from "../../../components/images/CarLogo.tsx";
import RatingBadge from "../../../components/data/RatingBadge.tsx";
import StatsGrid from "../../../components/data/grid/StatsGrid.tsx";
import PositionTrophy from "../../../components/images/PositionTrophy.tsx";
import {GridCol} from "../../../components/data/grid/models/GridCol.ts";
import {Result} from "../../../models/Result.ts";
import PositionDelta from "../../../components/data/PositionDelta.tsx";

const columns: GridCol<any, any>[] = [
    {
        key: 'finish_position',
        name: 'Pos',
        width: 10,
        // headerAlign: 'right',
        // align: 'right',
        renderCell: params => <PositionTrophy position={params.row.finish_position}/>,
        type: 'number'
    },
    {
        key: 'position_delta',
        name: 'Position Change',
        hideName: true,
        width: 10,
        // headerAlign: 'right',
        align: 'left',
        type: 'number',
        renderCell: params => <PositionDelta delta={params.row.position_delta}/> ,
    },
    {
        key: 'rating',
        name: '',
        width: 200,
        filterable: false,
        sortable: false,
        renderCell: params =>
            <Box display={'flex'} height={'100%'}>
                <RatingBadge
                    loading={false}
                    category={params.row.license_category_id}
                    license={params.row.new_license_level}
                    old_sr={params.row.old_sub_level}
                    safety_rating={params.row.new_sub_level}
                    old_ir={params.row.oldi_rating}
                    irating={params.row.newi_rating}
                    show_change={true}
                />
            </Box>,
    },
    {
        key: 'display_name',
        name: 'Driver',
        // flex: 1,
        minWidth: 150,
        align: 'left',
        headerAlign: 'left',
        renderCell: params =>
            <Link
                style={{ textDecoration: 'underline', fontStyle: 'italic', color: 'inherit', fontWeight: 'bold'}}
                to={`/driver/${params.row.cust_id}`}
            >{params.row.display_name}</Link>
    },
    {
        key: 'starting_position',
        name: 'Start',
        width: 80,
        type: 'number',
    },
    {
        key: 'logo',
        name: 'Car',
        align: 'right',
        width: 80,
        filterable: false,
        sortable: false,
        renderCell: params =>
            <Tooltip title={params.row.car_name} disableInteractive>
                <span>
                    <CarLogo link={params.row.logo}/>
                </span>
            </Tooltip>
    },
    {
        key: 'interval',
        name: 'Int',
        minWidth: 100,
        filterable: false,
        type: 'number',
        renderCell: params => params.row.interval === 0 ?
            "":
            params.row.laps_complete < params.row.event_laps_complete ?
                `-${params.row.event_laps_complete - params.row.laps_complete} L`:
                '-' + LapTime(params.row.interval, false)
    },
    // {
    //     key: 'mobile_rating',
    //     name: '',
    //     width: 140,
    //     filterable: false,
    //     renderCell: params =>
    //         <Box display={'flex'} height={'100%'}>
    //             <RatingBadge
    //                 loading={false}
    //                 category={params.row.license_category_id}
    //                 license={params.row.new_license_level}
    //                 safety_rating={params.row.new_sub_level}
    //                 irating={params.row.newi_rating}
    //                 show_change={false}
    //             />
    //         </Box>,
    // },
    {
        key: 'average_lap',
        name: 'Avg Lap',
        // flex: 1,
        filterable: false,
        type: "number",
        width: 125,
        renderCell: params =>
            params.row.average_lap === Number.MAX_SAFE_INTEGER ?
                "-" :
                LapTime(params.row.average_lap)
    },
    {
        key: 'best_lap_time',
        name: 'Best Lap',
        // headerAlign: 'center',
        align: 'center',
        // flex: 1,
        filterable: false,
        type: "number",
        width: 125,
        renderCell: params =>
            params.row.best_lap_time === Number.MAX_SAFE_INTEGER ?
                "-" :
                LapTime(params.row.best_lap_time)
    },
    {
        key: 'incidents',
        name: 'Incidents',
        type: 'number',
        width: 80,
        renderCell: params => params.row.incidents + 'x'
    }
];

export default function Subsession() {

    const {id} = useParams()

    const [subsessions, _] = useFetchArray<SubsessionModel>(`/api/subsessions?subsession_id=${id}`)
    const [subsession, setSubsession] =
        useState<SubsessionModel>(DefaultSubsession)

    useEffect(() => {
        if (subsessions.length > 0) setSubsession(subsessions[0])
    }, [subsessions]);


    const [expanded, setExpanded] = useState<string | false>('results');

    const handleChange =
        (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    let total_laps: number = 0
    let top_avg_lap: number = 0
    const [results, loading] = useFetchArray<Result>(`/api/subsession_results?id=${id}`,
        (obj) => {

            obj.position_delta = obj.starting_position - obj.finish_position

            obj.starting_position++

            if (obj.laps_complete > total_laps) total_laps = obj.laps_complete

            // Get top driver's average lap times
            if (top_avg_lap === 0) top_avg_lap = obj.average_lap
            obj.event_laps_complete = total_laps

            if (obj.average_lap < 1) obj.average_lap = Number.MAX_SAFE_INTEGER
            if (obj.best_lap_time < 1) obj.best_lap_time = Number.MAX_SAFE_INTEGER

            if (obj.interval < 0) obj.interval = top_avg_lap * total_laps + obj.finish_position

            return obj
        })

    // useEffect(() => {
    //     console.log(results)
    // }, [results]);

    return <>
        <Container maxWidth='xl'>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <SubsessionInfo subsession={subsession}/>

                <StatsGrid
                    id={'subsession-table'}
                    height={0.6}
                    loading={loading}
                    columns={columns}
                    rows={
                        results.sort((a, b) =>
                            Number(a.finish_position) - Number(b.finish_position)
                        )
                    }
                />
            </Box>

            <Box sx={{ mt: 2, display: { xs: 'block', md: 'none' } }}>

                <Accordion expanded={expanded === 'summary'} onChange={handleChange('summary')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography> Summary </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <SubsessionInfo subsession={subsession}/>
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded === 'results'} onChange={handleChange('results')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        Results
                    </AccordionSummary>

                    <AccordionDetails>
                        <StatsGrid
                            id={'subsession-table'}
                            loading={loading}
                            // sx={{ margin: 0 }}
                            columns={columns}
                            rows={
                                results.sort((a, b) =>
                                    Number(a.finish_position) - Number(b.finish_position)
                                )
                            }
                        />
                    </AccordionDetails>
                </Accordion>
            </Box>

        </Container>
    </>
}
