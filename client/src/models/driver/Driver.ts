import {Car} from "../Car.ts";
import {Series} from "../Series.ts";
import {Track} from "../Track.ts";
import {DefaultDriverRace, DriverRace} from "./Race.ts";
import {DefaultLicense, License} from "./License.ts";

export type DriverData = {
    cars: Car[]
    races: DriverRace[]
    series: Series[]
    tracks: Track[]
}

export type DriverSummary = {
    id: number,
    name: string,
    member_since: number,
    club_id: number,
    club_name: string,
    licenses: Record<number, License>
}

// Defaults
export const DefaultDriverData: DriverData = {
    cars: [],
    races: [DefaultDriverRace],
    series: [],
    tracks: [],
}

export const DefaultDriverSummary: DriverSummary = {
    id: 0,
    name: '',
    member_since: 0,
    club_id: 0,
    club_name: '',
    licenses: {
        1: DefaultLicense,
        3: DefaultLicense,
        4: DefaultLicense,
        5: DefaultLicense,
        6: DefaultLicense,
    }
}
