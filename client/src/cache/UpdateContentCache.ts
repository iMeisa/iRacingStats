import { ContentCacheModel } from "../models/ContentCache.ts";
import CurrentUrl from "../variables/Url.ts";
import PullCache from "./PullCache.ts";

export default async function UpdateContentCache() {

    const caches: ContentCacheModel[] =
        await fetch(`${CurrentUrl()}/api/cache_hashes`)
            .then(response => response.json())
    console.log(caches)

    let cachesToUpdate: string[] = []
    for (const cache of caches) {
        if (!verifyCache(cache)) cachesToUpdate.push(cache.content_name)
    }

    for (const contentName of cachesToUpdate) {
        await updateCache(contentName)
    }
}

async function updateCache(contentName: string){
    const updatedCache: ContentCacheModel =
        await fetch(`${CurrentUrl()}/api/content_cache?content_name=${contentName}`)
            .then(response => response.json())

    localStorage.setItem(contentName, JSON.stringify(updatedCache))
}

function verifyCache(fetchedCache: ContentCacheModel): boolean {
    const [localCache, cacheIsValid] = PullCache(fetchedCache.content_name)

    if (!cacheIsValid) return false

    return fetchedCache.hash === localCache.hash
}
