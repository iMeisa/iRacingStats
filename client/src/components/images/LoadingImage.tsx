import {useState} from "react";
import LogoSkeleton from "./LogoSkeleton.tsx";
import Box from "@mui/material/Box";

export default function LoadingImage(props:{width: number, height: number, url: string, endpoint: string}) {

    const [loading, setLoading] = useState(true)

    return <>
        <LogoSkeleton loading={loading} width={props.width} height={props.height}/>
        <Box display={'flex'} height={'100%'} py={0.25}>
            <img
                src={props.url + props.endpoint}
                alt="logo"
                width={props.width}
                style={loading ? { display: 'none' } : {}}
                onLoad={() => setLoading(false)}
            />
        </Box>
    </>
}
