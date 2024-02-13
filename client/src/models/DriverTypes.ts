import {Car} from "./Car.ts";
import {Series} from "./Series.ts";
import {DefaultResult, Result} from "./Result.ts";
import {Track} from "./Track.ts";

type License = {
    level: number,
    sub_level: number,
    irating: number,
}

export type DriverLicenses = {
    oval: License,
    road: License,
    dirt_oval: License,
    dirt_road: License,
}

export type DriverData = {
    cars: Car[]
    results: Result[]
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

const DefaultLicense: License = {
    level: 2,
    sub_level: 250,
    irating: 1350,
}

export const DefaultDriverData: DriverData = {
    cars: [],
    results: [DefaultResult],
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
