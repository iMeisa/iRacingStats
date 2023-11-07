import {useState} from "react";
import LogoSkeleton from "./LogoSkeleton.tsx";

export default function LoadingImage(props:{width: number, height: number, url: string, endpoint: string}) {

    const [loading, setLoading] = useState(true)

    return <>
        <LogoSkeleton loading={loading} width={props.width} height={props.height}/>
        <img
            src={props.url + props.endpoint}
            alt="logo"
            width={props.width}
            style={loading ? { display: 'none' } : {}}
            onLoad={() => setLoading(false)}
        />
    </>
}
