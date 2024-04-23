import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";

type RenderLoadingProps = {
    height: string | number,
}

export default function RenderLoading(props: RenderLoadingProps) {
    return <Box
        height={props.height}
        width={'100%'}
        display={'flex'}
        justifyContent={'space-around'}
    >
        <Box m={'auto'}>
            <CircularProgress/>
        </Box>
    </Box>
}
