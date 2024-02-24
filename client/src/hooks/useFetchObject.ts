import {useEffect, useState} from "react";
import CurrentUrl from "../variables/Url.ts";

export default function useFetchObject<Type = Record<string, unknown>>(typeDefault: Type, endpoint: string, dataFormat: (obj: Type) => Type = obj => obj): [Type, boolean] {

    const [object, setObject] = useState(typeDefault);

    const [loading, setLoading] = useState(true)


    // Fetch sessions
    useEffect(() => {

        setLoading(true)
        const url = `${CurrentUrl()}${endpoint}`
        console.log(url)
        fetch(url)
            .then((response) => response.json())
            .then((data: Type) => {

                // Data formatting here
                dataFormat(data)

                // Spreading the data to overwrite defaults for no empty data
                setObject({...typeDefault, ...data})
                setLoading(false)
            })
    }, [])

    return [object, loading]
}
