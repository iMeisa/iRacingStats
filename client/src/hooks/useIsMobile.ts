import useWindowSize from "./useWindowSize.ts";
import {useEffect, useState} from "react";

export default function useIsMobile() {

    const [ width, height ] = useWindowSize()
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (width < 600) setIsMobile(true)
        else setIsMobile(false)
    }, [width, height]);

    return isMobile
}
