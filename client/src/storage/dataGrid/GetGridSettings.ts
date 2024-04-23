import {GridSettings} from "../../models/GridSettings.ts";

export default function GetGridSettings(gridId: string): GridSettings {
    const rawGridSettings = localStorage.getItem(gridId + '-rdg')

    if (rawGridSettings === null) {
        return {
            sort: null,
            filters: [],
        } as GridSettings
    }

    return JSON.parse(rawGridSettings)
}
