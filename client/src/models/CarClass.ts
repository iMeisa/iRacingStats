export type CarClass = {
    car_class_id: number,
    name: string,
    relative_speed: number,
    short_name: string,
    cars_in_class: number[],
}

export const DefaultCarClass: CarClass = {
    car_class_id: 0,
    name: '',
    relative_speed: 0,
    short_name: '',
    cars_in_class: [],
}
