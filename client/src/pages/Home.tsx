import viteLogo from "../assets/vite.svg";
import reactLogo from "../assets/react.svg";
import {useEffect, useState} from "react";
import UnixToDate from "../functions/date/UnixToDate.ts";
import CurrentUrl from "../variables/Url.ts";

export default function Home() {
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

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>

            <h3>Data Range</h3>
            <p>{UnixToDate(minTime)} - {UnixToDate(maxTime)}</p>
        </>
    )
}
