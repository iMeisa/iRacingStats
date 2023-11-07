import LoadingImage from "./LoadingImage.tsx";
import DefaultLogo from "./DefaultLogo.tsx";

export default function SeriesLogo(props: {link?: string, width?: number, height?: number}) {

    return props.link === '' ? <DefaultLogo width={props.width ? props.width : 50}/> :
        <LoadingImage
            width={props.width ? props.width : 65}
            height={props.height ? props.height : 40}
            url={"https://images-static.iracing.com/img/logos/series/"}
            endpoint={props.link as string}
        />
}
