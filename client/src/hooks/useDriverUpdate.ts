import {useEffect, useState} from "react";
import {DefaultJsonResponse, JsonResponse} from "../models/JsonResponse.ts";
import CurrentUrl from "../variables/Url.ts";

export default function useDriverUpdate(id: string | undefined = '') {
    const [hasUpdate, setHasUpdate] = useState<boolean>(false)

    const [object, setObject] = useState<JsonResponse>(DefaultJsonResponse)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {

        const interval = setInterval(() => {

            setLoading(true)
            fetch(`${CurrentUrl()}/api/driver_update?cust_id=${id}`)
                .then((response) => response.json())
                .then((data: JsonResponse) => {
                    setObject(data)
                    setLoading(false)
                })

        }, 5000)

        return () => clearInterval(interval)

    }, []);

    useEffect(() => {
        if (loading) return
        if (!object.ok) return

        setHasUpdate(object.bool_val)
        // console.log(object)

    }, [loading]);


    return hasUpdate
}
