import {Card, CardActionArea, CardContent, CardHeader, Chip} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import WarningIcon from '@mui/icons-material/Warning';

type PageCardProps = {
    title: string,
    description: string,
    link: string,
    wip?: boolean,
}

export default function PageCard(props: PageCardProps) {
    return <Link to={props.link}>
        <Card>
            <CardActionArea>
                <CardHeader title={props.title} />
                <CardContent sx={{ height: '4.5em' }}>
                    { props.wip ?
                        <Chip icon={<WarningIcon color="warning"/>} label="Under Construction"/>
                        :
                        <Typography variant="body1">
                            {props.description}
                        </Typography>
                    }
                </CardContent>
            </CardActionArea>
        </Card>
    </Link>
}
