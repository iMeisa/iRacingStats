// pullCache pulls the cache from local storage and boolean if the data as valid
import {
    ContentCacheModel,
    DefaultContentCacheModel,
    DefaultContentCacheModelString
} from "../models/ContentCache.ts";

export default function PullCache(contentName: string): [ContentCacheModel, boolean] {
    const rawCache = localStorage.getItem(contentName)

    let cache: ContentCacheModel = DefaultContentCacheModel
    if (
        rawCache === null ||
        rawCache === undefined ||
        rawCache === 'undefined' ||
        rawCache === DefaultContentCacheModelString
    ) {
        return [cache, false]
    }

    cache = JSON.parse(rawCache)
    return [cache, true]
}
