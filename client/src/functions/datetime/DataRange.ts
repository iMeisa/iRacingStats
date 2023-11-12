import {useEffect, useState} from "react";
import CurrentUrl from "../../variables/Url.ts";
import {UnixToDate, UnixToDateTime} from "./UnixToDate.ts";

export default function DataRange(): string {

    const [minTime, setMinTime] = useState(0)
    const [maxTime, setMaxTime] = useState(0)

    useEffect(() => {
        const url = `${CurrentUrl()}/api/data_range`
        fetch(url)
            .then((response) => response.json())
            .then((data: Record<string, number>) => {
                setMinTime(data['min'])
                setMaxTime(data['max'])
            })
    }, []);

    return `${UnixToDate(minTime)} - ${UnixToDateTime(maxTime)}`
}
