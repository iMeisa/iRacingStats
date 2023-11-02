import useFetch from "../../hooks/useFetch.ts";
import {useParams} from "react-router-dom";

export default function User() {
    const {id} = useParams()

    // const [user, loading] = useFetch()

    return <>{id}</>
}
