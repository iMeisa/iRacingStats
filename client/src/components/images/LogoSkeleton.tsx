import {Skeleton} from "@mui/material";

export default function LogoSkeleton(props: {loading: boolean, width: number, height: number}) {
    return <Skeleton
        variant="rounded"
        width={props.width}
        height={props.height}
        style={props.loading ? {} : { display: 'none' }}
    />
}
