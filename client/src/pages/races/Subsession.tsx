import {useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import useFetch from "../../hooks/useFetch.ts";
import {useEffect, useState} from "react";
import {Subsession as SubsessionModel} from "../../models/Subsession.ts";
import InfoCard from "../../components/data/InfoCard.tsx";
import LapTime from "../../functions/datetime/LapTime.ts";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {LinearProgress} from "@mui/material";

const columns: GridColDef[] = [
    { field: 'finish_position', headerName: '#' },
    { field: 'cust_id', headerName: 'customer', flex: 1},
    { field: 'car_id', headerName: 'car', flex: 1},
    { field: 'average_lap', headerName: 'avg lap', flex: 1},
    { field: 'best_lap_time', headerName: 'best lap', headerAlign: 'center', align: 'center', flex: 1},
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

    const [results, loading] = useFetch(`/api/results?rows=500&simsession_number=0&subsession_id=${id}`,
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
        <Container>
            <Grid container mt={2} spacing={2}>
                <InfoCard title="Average Lap" info={LapTime(subsession.event_average_lap)}/>
                <InfoCard title="Laps Completed" info={subsession.event_laps_complete}/>
                <InfoCard title="Cautions" info={subsession.num_cautions}/>
                <InfoCard title="Lead Changes" info={subsession.num_lead_changes}/>
                <InfoCard title="Strength of Field" info={subsession.event_strength_of_field}/>
                <InfoCard title="Caution Laps" info={subsession.num_caution_laps}/>
            </Grid>

            <DataGrid

                slots={{
                    loadingOverlay: LinearProgress,
                }}
                loading={loading}

                columns={columns}
                rows={results}

                pageSizeOptions={[]}
            />
        </Container>
    </>
}