import {useEffect, useState} from "react";
import CurrentUrl from "../variables/Url.ts";

export default function useFetchObject<Type = Record<string, unknown>>(endpoint: string, dataFormat: (obj: Type) => Type = obj => obj): [Type, boolean] {

    const emptyObject: Type = {} as Type
    const [rows, setRows] = useState(emptyObject);

    const [loading, setLoading] = useState(true)


    // Fetch sessions
    useEffect(() => {

        setLoading(true)
        const url = `${CurrentUrl()}${endpoint}`
        // console.log(url)
        fetch(url)
            .then((response) => response.json())
            .then((data: Type) => {

                // Data formatting here
                dataFormat(data)

                setRows(data)
                setLoading(false)
            })
    }, [])

    return [rows, loading]
}
