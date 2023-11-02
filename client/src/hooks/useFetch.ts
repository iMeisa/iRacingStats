import {useEffect, useState} from "react";
import CurrentUrl from "../variables/Url.ts";

export default function useFetch(endpoint: string, dataFunc: (obj: Record<string, unknown>) => Record<string, unknown>): [Record<string, unknown>[], boolean] {

    const emptyRows: Record<string, unknown>[] = []
    const [rows, setRows] = useState(emptyRows);

    const [loading, setLoading] = useState(true)


    // Fetch sessions
    useEffect(() => {

        setLoading(true)
        const url = `${CurrentUrl()}${endpoint}`
        // console.log(url)
        fetch(url)
            .then((response) => response.json())
            .then((data: Record<string, unknown>[]) => {

                // Data formatting here
                data.map(dataFunc)

                setRows(data)
                setLoading(false)
            })
    }, [])

    return [rows, loading]
}
