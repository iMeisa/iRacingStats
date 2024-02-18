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

export const DefaultLicense: License = {
    level: 2,
    sub_level: 250,
    irating: 1350,
}
