import {Link, useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import useFetch from "../../../hooks/useFetch.ts";
import {SyntheticEvent, useEffect, useState} from "react";
import {Subsession as SubsessionModel} from "../../../models/Subsession.ts";
import LapTime from "../../../functions/datetime/LapTime.ts";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {Accordion, AccordionDetails, AccordionSummary, LinearProgress, Tooltip} from "@mui/material";
import SubsessionInfo from "./SubsessionInfo.tsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CarLogo from "../../../components/images/CarLogo.tsx";

const columns: GridColDef[] = [
    { field: 'finish_position', headerName: '#', width: 75 },
    {
        field: 'display_name',
        headerName: 'Driver',
        flex: 1,
        minWidth: 150,
        renderCell: params =>
            <Link
                style={{ textDecoration: 'underline', fontStyle: 'italic', color: 'inherit', fontWeight: 'bold'}}
                to={`/user/${params.row.cust_id}`}
            >{params.value}</Link>
    },
    {
        field: 'logo',
        headerName: 'Car',
        headerAlign: 'center',
        width: 75,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <Tooltip title={params.row.car_name} disableInteractive>
                <span>
                    <CarLogo link={params.value as string}/>
                </span>
            </Tooltip>,
    },
    { field: 'average_lap', headerName: 'Avg Lap', flex: 1, minWidth: 125 },
    { field: 'best_lap_time', headerName: 'Best Lap', headerAlign: 'center', align: 'center', flex: 1, minWidth: 125 },
];

export default function Subsession() {

    const {id} = useParams()

    const [subsessions, _] = useFetch<SubsessionModel>(`/api/subsessions?subsession_id=${id}`)
    const [subsession, setSubsession] =
        useState<SubsessionModel>({
            end_time: 0,
            event_average_lap: 0,
            event_laps_complete: 0,
            event_strength_of_field: 0,
            heat_info_id: 0,
            num_caution_laps: 0,
            num_cautions: 0,
            num_laps_for_qual_average: 0,
            num_laps_for_solo_average: 0,
            num_lead_changes: 0,
            private_session_id: 0,
            session_id: 0,
            subsession_id: 0,
            verified: false,
        })

    useEffect(() => {
        if (subsessions.length > 0) setSubsession(subsessions[0])
    }, [subsessions]);


    const [expanded, setExpanded] = useState<string | false>('results');

    const handleChange =
        (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const [results, loading] = useFetch(`/api/subsession_results?id=${id}`,
        (obj) => {
            obj['id'] = obj['result_id']
            obj['finish_position'] = obj['finish_position'] as number + 1
            obj['average_lap'] = LapTime(obj['average_lap'] as number)
            obj['best_lap_time'] = LapTime(obj['best_lap_time'] as number)
            return obj
        })

    useEffect(() => {
        console.log(results)
    }, [results]);

    return <>
        <Container maxWidth='xl'>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <SubsessionInfo subsession={subsession}/>

                <DataGrid

                    slots={{
                        loadingOverlay: LinearProgress,
                    }}
                    loading={loading}

                    columns={columns}
                    rows={results}

                    pageSizeOptions={[100]}
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
                        <DataGrid
                            slots={{
                                loadingOverlay: LinearProgress,
                            }}
                            loading={loading}
                            sx={{ margin: 0 }}
                            columns={columns}
                            rows={results}
                            pageSizeOptions={[100]}
                            hideFooter
                        />
                    </AccordionDetails>
                </Accordion>
            </Box>

        </Container>
    </>
}
