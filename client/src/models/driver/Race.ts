import {DefaultResult, Result} from "../Result.ts";
import {DefaultSubsession, Subsession} from "../Subsession.ts";
import {DefaultSession, Session} from "../Session.ts";
import {DefaultSeries, Series} from "../Series.ts";
import {Car, DefaultCar} from "../Car.ts";
import {DefaultTrack, Track} from "../Track.ts";

export type DriverRace = Result & Subsession & Session & Series & Car & Track & {
    car_logo: string,
    series_logo: string,
    track_logo: string,
    valid_race: boolean,
    dnf: boolean,
    sr_change: number,
    ir_change: number,
}

export const DefaultDriverRace: DriverRace = {
    ...DefaultResult,
    ...DefaultSubsession,
    ...DefaultSession,
    ...DefaultSeries,
    ...DefaultCar,
    ...DefaultTrack,
    car_logo: '',
    series_logo: '',
    track_logo: '',
    valid_race: false,
    dnf: false,
    sr_change: 0,
    ir_change: 0,
}
