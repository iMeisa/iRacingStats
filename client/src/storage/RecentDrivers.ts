import {StoredDriver} from "../models/StoredDriver.ts";

export default function RecentDrivers() {
    const recent_drivers_storage = localStorage.getItem('recent_drivers')

    if (recent_drivers_storage === null) return [] as StoredDriver[]

    return JSON.parse(recent_drivers_storage)
}
