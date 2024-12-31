import {useEffect, useState} from "react";
import CurrentUrl from "../variables/Url.ts";

export default function useFetchArrayState<Type = Record<string, unknown>>(state: any, endpoint: string, dataFunc: (obj: Type) => Type = obj => obj): [Type[], boolean] {

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

                if (!data) {
                    setRows(emptyRows)
                }

                // Data formatting here
                data.map(dataFunc)

                setRows(data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [state])

    return [rows, loading]
}
