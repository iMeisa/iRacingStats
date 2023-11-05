import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import CurrentUrl from "../variables/Url.ts";
import StripUrl from "../functions/strings/StripUrl.ts";

export default function UsePageHit() {

    const location = useLocation()

    useEffect(() => {
        const strippedUrl = StripUrl(location.pathname)
        console.log("hitting: ", strippedUrl)
        fetch(`${CurrentUrl()}/api/visit?page=${strippedUrl}`).then(r => console.log(r));
    }, [location])
}
