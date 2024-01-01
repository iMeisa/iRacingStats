import {Card, CardActionArea, CardContent, CardHeader, CardMedia, Chip} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import WarningIcon from '@mui/icons-material/Warning';

type PageCardProps = {
    title: string,
    description: string,
    link: string,
    wip?: boolean,
    image?: string,
    imgHeight?: string,
    imgAlt?: string,
}

export default function PageCard(props: PageCardProps) {
    return <Link to={props.link}>
        <Card>
            <CardActionArea>
                <CardHeader title={props.title} />
                {
                    props.image ?
                        <CardMedia
                            component="img"
                            height={props.imgHeight ? props.imgHeight : '100px'}
                            image={props.image}
                            alt={props.imgAlt ? props.imgAlt : ''}
                        />
                        : ''
                }
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
