import {TextField} from "@mui/material";
import Box from "@mui/material/Box";


export default function Users() {
    return (
        <>
            {/*<h2>Users</h2>*/}
            <Box className={"container"} sx={{mt: 10}}>
                <TextField fullWidth label="Search user(s)" type="search" />
            </Box>
        </>
    )
}
