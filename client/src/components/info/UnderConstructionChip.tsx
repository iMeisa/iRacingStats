import {Chip} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

export default function UnderConstructionChip() {
    return <Chip icon={<WarningIcon color="warning"/>} label="Under Construction"/>
}
