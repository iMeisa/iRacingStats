import {UnixToDateTime} from "../../functions/datetime/UnixToDate.ts";
import {Skeleton} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import UnixTimeAgo from "./UnixTimeAgo.tsx";
import useDataRange from "../../hooks/useDataRange.ts";

export default function DataRange() {

    const [dataRange, loading] = useDataRange()

    return <>
        <Box mt={2} display='flex' justifyContent='center' gap={1}>
            {loading ?
                <>
                    <Skeleton height={'2em'} width='20em'/>
                    -
                    <Skeleton height={'2em'} width='20em'/>
                </>
                :
                <>
                    <Typography>
                        {UnixToDateTime(dataRange.min)}
                    </Typography>
                    -
                    <UnixTimeAgo unixStamp={dataRange.max}/>
                </>
            }
        </Box>
        </>
}
