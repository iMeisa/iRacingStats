import {Input} from "@mui/material";
import React from "react";

function inputStopPropagation(event: React.KeyboardEvent<HTMLInputElement>) {
    if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.stopPropagation();
    }
}


export default function FilterInput() {
    return <Input onKeyDown={inputStopPropagation}/>
}
