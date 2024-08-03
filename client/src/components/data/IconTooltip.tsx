import {ReactElement} from "react";
import {Tooltip} from "@mui/material";

type IconTooltipProps = {
    title: string;
    children: ReactElement;
}
export default function IconTooltip(props: IconTooltipProps) {
    return <Tooltip
        title={props.title}
        disableInteractive
        arrow
        enterTouchDelay={100}
    >
        <span>
            {props.children}
        </span>
    </Tooltip>
}
