import PullCache from "./PullCache.ts";

// TODO implement hash checking

export default function ContentCache(contentName: string): Record<string, unknown>[] {
    /**
     * Returns cached content
     * It will cache content if not yet done so
     *
     * @param contentName - Name of the content
     *
     * @returns {Record<string, unknown>[]} data of content
     */


    let [cache, cacheIsValid] = PullCache(contentName)
    if (cacheIsValid) return cache.data

    return []
}

// verifyHash returns boolean if hash is up-to-date
// function verifyHash(contentName: string, hash: string): boolean {
//     const dbCache: Promise<ContentCacheModel> =
//         fetch(`/api/content_cache?content_type=${contentName}&rows=1`)
//             .then(response => response.json())
//
//     console.log(dbCache)
//     return false
// }
