import PullCache from "./PullCache.ts";

// TODO implement hash checking

export default function ContentCache<Type = Record<string, unknown>[]>(contentName: string): Type[] {
    /**
     * Returns cached content
     * It will cache content if not yet done so
     *
     * @param contentName - Name of the content
     *
     * @returns {Record<string, unknown>[]} data of content
     */

    let [cache, cacheIsValid] = PullCache(contentName)
    const data: Type[] = JSON.parse(cache.data)

    if (cacheIsValid) return data

    return []
}
