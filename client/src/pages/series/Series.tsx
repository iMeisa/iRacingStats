import {useParams} from "react-router-dom";

export default function Series() {

    const {id} = useParams()

    return <>{id}</>
}
