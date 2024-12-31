import {TrackConfig} from "../../models/Track.ts";
import Box from "@mui/material/Box";
import {CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

type TrackConfigSelectProps = {
    trackId: string | undefined
    trackConfigs: TrackConfig[]
    trackConfigsLoading: boolean
}
export default function TrackConfigSelect(props: TrackConfigSelectProps) {

    const [configEmpty, setConfigEmpty] = useState<boolean>(true)

    const navigate = useNavigate()
    const handleChange = (event: SelectChangeEvent) => {
        event.preventDefault()
        navigate(`/track/${event.target.value}`, {replace: false, state: undefined, relative: 'route'})
        // navigate(0)
    };

    // If config name is empty, don't show config select
    useEffect(() => {
        if (props.trackConfigsLoading) return

        if (props.trackConfigs.length < 1) return

        // Show if config name is not empty
        // Logic reversed for page smoothness
        if (props.trackConfigs[0].config_name.length > 0) setConfigEmpty(false)

    }, [props.trackConfigsLoading])

    return <> { props.trackConfigsLoading ?
        <CircularProgress style={{margin: 20}}/> :
            props.trackConfigs.length < 1 || configEmpty ?
            <></> :
            <Box m={2} sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="track-config-label">Config</InputLabel>
                    <Select
                        labelId="track-config-label"
                        id="track-config-select"
                        value={props.trackId}
                        label="Config"
                        onChange={handleChange}
                        disabled={props.trackConfigs.length < 2}
                    >
                        { props.trackConfigs.map((config) =>
                            <MenuItem value={config.track_id}>{config.config_name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Box>
    }
    </>
}
