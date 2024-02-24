import {Car} from "../Car.ts";
import {Series} from "../Series.ts";
import {Track} from "../Track.ts";
import {DefaultDriverRace, DriverRace} from "./Race.ts";
import {DefaultLicense, DriverLicenses} from "./License.ts";

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
    licenses: DriverLicenses
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
        oval: DefaultLicense,
        road: DefaultLicense,
        dirt_oval: DefaultLicense,
        dirt_road: DefaultLicense,
    }
}
