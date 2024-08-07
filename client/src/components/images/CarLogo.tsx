import LoadingImage from "./LoadingImage.tsx";
import DefaultLogo from "./DefaultLogo.tsx";

export default function CarLogo(props: {link?: string}) {
    return props.link === '' ? <DefaultLogo width={60} height={40}/> :
        <LoadingImage
            width={60}
            height={40}
            url={"https://images-static.iracing.com"}
            endpoint={props.link as string}
        />
}
