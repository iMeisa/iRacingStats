export type Series = {
    category: string,
    category_id: number,
    id: number,
    logo: string,
    min_license_level: number,
    name: string,
}

export const SeriesDefault: Series = {
    category: '',
    category_id: 0,
    id: 0,
    logo: '',
    min_license_level: 0,
    name: '',
}
