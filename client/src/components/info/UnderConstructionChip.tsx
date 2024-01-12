import {Chip, Tooltip} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

export default function UnderConstructionChip() {
    return <Tooltip title="Feature not fully functional yet">
        <Chip icon={<WarningIcon color="warning"/>} label="Under Construction"/>
    </Tooltip>
}
