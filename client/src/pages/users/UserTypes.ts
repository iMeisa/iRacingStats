const DefaultLicense: License = {
    level: 2,
    sub_level: 250,
    irating: 1350,
}

type License = {
    level: number,
    sub_level: number,
    irating: number,
}

type UserLicenses = {
    oval: License,
    road: License,
    dirt_oval: License,
    dirt_road: License,
}

export type User = {
    id: number,
    name: string,
    member_since: number,
    club_id: number,
    club_name: string,
    licenses: UserLicenses
}

export const defaultUser: User = {
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
