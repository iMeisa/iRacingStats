import {Series} from "../models/Series.ts";
import ContentCache from "./ContentCache.ts";
import SortById from "../functions/objects/SortById.ts";
import {Car} from "../models/Car.ts";
import {Track} from "../models/Track.ts";

export function CarsById(): Record<number, Car> {
    const cache = ContentCache<Car>('cars')
    return SortById<Car>(cache, 'car_id')
}

export function SeriesById(): Record<number, Series> {
    const cache = ContentCache<Series>('series')
    return SortById<Series>(cache, 'series_id')
}

export function TracksById(): Record<number, Track> {
    const cache = ContentCache<Track>('tracks')
    return SortById<Track>(cache, 'track_id')
}
