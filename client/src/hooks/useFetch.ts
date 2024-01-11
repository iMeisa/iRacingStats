import {useEffect, useState} from "react";
import CurrentUrl from "../variables/Url.ts";

export default function useFetch<Type = Record<string, unknown>>(endpoint: string, dataFunc: (obj: Type) => Type = obj => obj): [Type[], boolean] {

    const emptyRows: Type[] = []
    const [rows, setRows] = useState(emptyRows);

    const [loading, setLoading] = useState(true)


    // Fetch sessions
    useEffect(() => {

        setLoading(true)
        const url = `${CurrentUrl()}${endpoint}`
        // console.log(url)
        fetch(url)
            .then((response) => response.json())
            .then((data: Type[]) => {

                // Data formatting here
                data.map(dataFunc)

                setRows(data)
                setLoading(false)
            })
    }, [])

    return [rows, loading]
}
