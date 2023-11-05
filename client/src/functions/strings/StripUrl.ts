import GetPosition from "./CharPosition.ts";

export default function StripUrl(pathname: string) {
    const splitUrl = pathname.split("/")

    if (splitUrl.length > 2) {
        return pathname.substring(0, GetPosition(pathname, "/", 2))
    }

    return pathname
}
