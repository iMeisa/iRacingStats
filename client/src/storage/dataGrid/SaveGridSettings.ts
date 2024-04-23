import {GridSettings} from "../../models/GridSettings.ts";

export default function SaveGridSettings(gridId: string, settings: GridSettings) {

    if (gridId === 'undefined') return

    localStorage.setItem(gridId + '-rdg', JSON.stringify(settings))
}
