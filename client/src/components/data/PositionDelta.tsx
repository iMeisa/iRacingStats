import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import RemoveIcon from '@mui/icons-material/Remove';
import Box from "@mui/material/Box";
import {SxProps, Theme} from "@mui/material";

type PositionDeltaProps = {
    delta: number,
}

const iconStyles: SxProps<Theme> = {
    margin: 0,
    position: 'absolute',
    top: '50%',
    transform: 'translate(-25%, -50%)'
}

export default function PositionDelta(props: PositionDeltaProps) {

    return <Box display={'flex'}>
        { props.delta === 0 ?
            <RemoveIcon sx={iconStyles}/>:
            props.delta > 0 ?
                <KeyboardArrowUpIcon color={'success'} sx={iconStyles}/> :
                <KeyboardArrowDownIcon color={'error'} sx={iconStyles}/>

        }
        <Box ml={2.5} fontWeight='bold'>
            {Math.abs(props.delta)}
        </Box>
    </Box>
}
