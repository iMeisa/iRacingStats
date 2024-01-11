import {useState} from "react";
import {useSearchParams} from "react-router-dom";

function tabValue(searchParams: URLSearchParams, panels: string[]): number {
    const tabName = searchParams.get("tab")

    if (tabName === null) return 0

    const tabIndex = panels.findIndex(element => element === tabName )
    if (tabIndex < 0) return 0

    return tabIndex
}

export default function useTabState(panels: string[]): [number, Function] {
    const [searchParams, setSearchParams] = useSearchParams({tab: ""})
    const [tab, setTab] = useState(tabValue(searchParams, panels))

    return [tab, function (newTab: number) {
        setTab(newTab)
        setSearchParams(params => {
            params.set("tab", panels[newTab])
            return params
        })
    }]
}
