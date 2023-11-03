import Grid from "@mui/material/Unstable_Grid2";
import {Item} from "./Item.tsx";
import Typography from "@mui/material/Typography";
import {CircularProgress} from "@mui/material";

export default function InfoCard(props: {title: string, info?: any}) {

    return <Grid xs={6} md={4}>
        <Item elevation={5}>
            <Typography variant="subtitle1" component="h1">
                {props.title}
            </Typography>
            <Typography variant="h6">
                { props.info === undefined ? (
                        <CircularProgress size={'1em'}/>
                    ):(
                        props.info
                    )
                }
            </Typography>
        </Item>
    </Grid>
}
