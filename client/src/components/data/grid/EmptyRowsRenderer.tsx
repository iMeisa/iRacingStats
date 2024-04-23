import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// type EmptyRowsRendererProps = {
//     width: number | string,
// }

export function EmptyRowsRenderer() {
    return <Box mt={1} ml={1} textAlign='center' >
        <Typography>
            No Rows
        </Typography>
    </Box>
}
