import {UnixToDateTime} from "../../functions/datetime/UnixToDate.ts";
import useFetchObject from "../../hooks/useFetchObject.ts";
import {DataRange as DataRangeModel, DefaultDataRange} from "../../models/DataRange.ts";
import {Skeleton} from "@mui/material";
import TimeAgo from "@elbotho/timeago-react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function DataRange() {

    const [dataRange, loading] =
        useFetchObject<DataRangeModel>(DefaultDataRange, '/api/data_range')

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
                    <TimeAgo datetime={new Date(dataRange.max * 1000)}/>
                </>
            }
        </Box>
        </>
}