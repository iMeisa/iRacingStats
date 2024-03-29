import {Link, useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import useFetchArray from "../../../hooks/useFetchArray.ts";
import {SyntheticEvent, useEffect, useState} from "react";
import {DefaultSubsession, Subsession as SubsessionModel} from "../../../models/Subsession.ts";
import LapTime from "../../../functions/datetime/LapTime.ts";
import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {Accordion, AccordionDetails, AccordionSummary, Tooltip} from "@mui/material";
import SubsessionInfo from "./SubsessionInfo.tsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CarLogo from "../../../components/images/CarLogo.tsx";
import RatingBadge from "../../../components/data/RatingBadge.tsx";
import StatsGrid from "../../../components/data/grid/StatsGrid.tsx";
import PositionTrophy from "../../../components/images/PositionTrophy.tsx";

const columns: GridColDef[] = [
    {
        field: 'finish_position',
        headerName: 'Pos',
        width: 10,
        headerAlign: 'right',
        align: 'right',
        renderCell: params => <PositionTrophy position={params.value}/>,
        type: 'number'
    },
    {
        field: 'rating',
        headerName: '',
        width: 200,
        filterable: false,
        renderCell: params =>
            <RatingBadge
                loading={false}
                category={params.row.license_category_id}
                license={params.row.new_license_level}
                old_sr={params.row.old_sub_level}
                safety_rating={params.row.new_sub_level}
                old_ir={params.row.oldi_rating}
                irating={params.row.newi_rating}
                show_change={true}
            />,
    },
    {
        field: 'display_name',
        headerName: 'Driver',
        flex: 1,
        minWidth: 150,
        renderCell: params =>
            <Link
                style={{ textDecoration: 'underline', fontStyle: 'italic', color: 'inherit', fontWeight: 'bold'}}
                to={`/driver/${params.row.cust_id}`}
            >{params.value}</Link>
    },
    {
        field: 'mobile_rating',
        headerName: '',
        width: 140,
        filterable: false,
        renderCell: params =>
            <RatingBadge
                loading={false}
                category={params.row.license_category_id}
                license={params.row.new_license_level}
                safety_rating={params.row.new_sub_level}
                irating={params.row.newi_rating}
                show_change={false}
            />,
    },
    {
        field: 'logo',
        headerName: 'Car.ts',
        headerAlign: 'center',
        align: 'right',
        width: 80,
        filterable: false,
        renderCell: (params: GridRenderCellParams<any, string>) =>
            <Tooltip title={params.row.car_name} disableInteractive>
                <span>
                    <CarLogo link={params.value as string}/>
                </span>
            </Tooltip>,
    },
    {
        field: 'average_lap',
        headerName: 'Avg Lap',
        flex: 1,
        filterable: false,
        minWidth: 125
    },
    {
        field: 'best_lap_time',
        headerName: 'Best Lap',
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        filterable: false,
        minWidth: 125
    },
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

    const [results, loading] = useFetchArray(`/api/subsession_results?id=${id}`,
        (obj) => {
            obj['id'] = obj['result_id']
            obj['average_lap'] = LapTime(obj['average_lap'] as number)
            obj['best_lap_time'] = LapTime(obj['best_lap_time'] as number)
            return obj
        })

    useEffect(() => {
        console.log(results)
    }, [results]);

    // Column defaults
    columns.map((col) => {
        col.hideSortIcons = true
    })

    return <>
        <Container maxWidth='xl'>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <SubsessionInfo subsession={subsession}/>

                <StatsGrid
                    loading={loading}
                    columns={columns}
                    rows={results}
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                mobile_rating: false
                            }
                        }
                    }}
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
                            loading={loading}
                            sx={{ margin: 0 }}
                            columns={columns}
                            rows={results}
                            hideFooter
                            initialState={{
                                columns: {
                                    columnVisibilityModel: {
                                        rating: false
                                    }
                                }
                            }}
                        />
                    </AccordionDetails>
                </Accordion>
            </Box>

        </Container>
    </>
}
