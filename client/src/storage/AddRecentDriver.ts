import {StoredDriver} from "../models/StoredDriver.ts";
import {DriverSummary} from "../models/driver/Driver.ts";
import RecentDrivers from "./RecentDrivers.ts";

export default function AddRecentDriver(driver: DriverSummary) {
    let drivers: StoredDriver[] = [
        {id: driver.id, display_name: driver.name}
    ]

    for (const driver of RecentDrivers()) {
        drivers.push(driver)
    }

    // Eliminate repeated drivers
    let ids: number[] = []
    let uniqueDrivers: StoredDriver[] = []
    for (const driver of drivers) {
        if (ids.includes(driver.id)) continue

        ids.push(driver.id)
        uniqueDrivers.push(driver)
    }
    console.log(ids, uniqueDrivers)


    localStorage.setItem('recent_drivers', JSON.stringify(uniqueDrivers))
}
