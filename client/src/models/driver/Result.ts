import {DefaultResult, Result} from "../Result.ts";
import {DefaultSubsession, Subsession} from "../Subsession.ts";
import {DefaultSession, Session} from "../Session.ts";

export type DriverRace = Result & Subsession & Session

export const DefaultDriverRace: DriverRace = {
    ...DefaultResult,
    ...DefaultSubsession,
    ...DefaultSession,
}
