import {Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";

type InfoProps = {
    loading: boolean,
    logo: string,
    name: string,
}

export default function Info(props: InfoProps) {
    return <>
        { props.loading ? (
            <>
                <Skeleton className={"centered logo"} variant="rounded" width={200} height={100} />
                <Skeleton className={"centered"} variant="text" sx={{ fontSize: '1.5rem', width: '20vw' }}/>
            </>
        ) : (
            <>
                <img
                    className={"session-logo"}
                    src={"https://images-static.iracing.com/img/logos/series/"+props.logo}
                    alt="logo"
                    loading="lazy"
                />
                <Typography variant="h4" fontWeight="bold" mt={2}>{props.name}</Typography>
            </>
        )}
        <Typography variant="subtitle2">more to come soon</Typography>
    </>
}
