import {Series} from "../models/Series.ts";
import ContentCache from "./ContentCache.ts";
import SortById from "../functions/objects/SortById.ts";
import {Car} from "../models/Car.ts";
import {Track} from "../models/Track.ts";
import {CarClass} from "../models/CarClass.ts";

export function CarsById(): Record<number, Car> {
    const cache = ContentCache<Car>('cars')
    return SortById<Car>(cache, 'car_id')
}

export function CarClassesById(): Record<number, CarClass> {
    const cache = ContentCache<CarClass>('car_classes')
    return SortById<CarClass>(cache, 'car_class_id')
}

export function SeriesById(): Record<number, Series> {
    const cache = ContentCache<Series>('series')
    return SortById<Series>(cache, 'series_id')
}

export function TracksById(): Record<number, Track> {
    const cache = ContentCache<Track>('tracks')
    return SortById<Track>(cache, 'track_id')
}
