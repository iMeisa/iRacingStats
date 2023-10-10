import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import React, {useEffect} from "react";
import {useFetcher, useSearchParams} from "react-router-dom";


export default function Users() {

    const [searchParams, setSearchParams] = useSearchParams({name: ""})
    const name = searchParams.get("name")

    useEffect(() => {
        fetch(`http://127.0.0.1:8080/api/customers?display_name="${name}"`)
            .then((response) => response.json())
            .then((data: Record<string, unknown>[]) => console.log(data))
    }, [name]);

    return (
        <>
            {/*<h2>Users</h2>*/}
            <Box className={"container"} sx={{mt: 10}}>
                <TextField
                    fullWidth
                    label="Search user(s)"
                    type="search"
                    value={name}
                    onChange={event => setSearchParams(prev => {
                        prev.set("name", event.target.value)
                        return prev
                    }, {replace: true})}
                />
            </Box>
        </>
    )
}
