import useFetch from "../../hooks/useFetch.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

type User = {
    id: number,
    display_name: string,
}

export default function User() {
    const {id} = useParams()

    const emptyUser: User = {id: 0, display_name: ''}
    const [user, setUser] = useState(emptyUser)

    const [users, loading] =
        useFetch<User>(`/api/user?cust_id=${id}`,
            (obj) => {
                // obj['id'] = obj['cust_id']
                return obj
            })

    useEffect(() => {

        if (users.length > 0) setUser(users[0])

        console.log("users: ", users)
    }, [users]);

    return <>{user.id} {user.display_name} {String(loading)}</>
}
