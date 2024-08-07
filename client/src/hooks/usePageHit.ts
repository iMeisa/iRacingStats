import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import CurrentUrl from "../variables/Url.ts";
import StripUrl from "../functions/strings/StripUrl.ts";
import IpFetch from "../functions/data/IpFetch.ts";
import {browserName, getUA, isMobile} from "react-device-detect";

export default function UsePageHit() {

    const location = useLocation()

    const [ip, loading] = IpFetch()

    useEffect(() => {
        const strippedUrl = StripUrl(location.pathname)
        fetch(`${CurrentUrl()}/api/visit?page=${strippedUrl}`).then(_ => {});

    }, [location])

    useEffect(() => {
        if (!loading) fetch(`${CurrentUrl()}/api/hit_page?page=${location.pathname}&ip=${ip}&browser=${browserName}&is_mobile=${isMobile}&ua=${getUA}`)
            .then(_ => {});
    }, [location, loading]);
}
