import LoadingImage from "./LoadingImage.tsx";
import DefaultLogo from "./DefaultLogo.tsx";

export default function TrackLogo(props: {link?: string, width?: number, height?: number}) {

    return props.link === '' ? <DefaultLogo width={props.width ? props.width : 60}/> :
        <LoadingImage
            width={props.width ? props.width : 60}
            height={props.height ? props.height : 40}
            url={"https://images-static.iracing.com"}
            endpoint={props.link as string}
        />
}
