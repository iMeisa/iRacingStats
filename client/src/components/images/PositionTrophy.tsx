import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import {amber, deepOrange, grey} from "@mui/material/colors";
import Box from "@mui/material/Box";

type PositionTrophyProps = {
    position: number,
}

export default function PositionTrophy(props: PositionTrophyProps) {

    switch (props.position) {
        case 0: {
                return <EmojiEventsIcon sx={{ color: amber[500] }}/>
            }
        case 1: {
                return <EmojiEventsIcon sx={{ color: grey[500] }}/>
            }
        case 2: {
                return <EmojiEventsIcon sx={{ color: deepOrange[900] }}/>
            }
    }

    return <Box fontWeight='bold'>
        {props.position + 1}
    </Box>
}
