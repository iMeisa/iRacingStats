import {ContentCacheModel, DefaultContentCacheModel, DefaultContentCacheModelString} from "../models/ContentCache.ts";
import useFetchObject from "./useFetchObject.ts";
import {useEffect, useState} from "react";

// TODO implement hash checking

export default function useContentCache(contentName: string): [Record<string, unknown>[], boolean] {
    /**
     * Returns cached content
     * It will cache content if not yet done so
     *
     * @param contentName - Name of the content
     *
     * @returns {Record<string, unknown>[], boolean} data of content, and if loading
     */


    let [cache, cacheIsValid] = pullCache(contentName)

    if (cacheIsValid) return [cache.data, false]

    // Update cache if it isn't valid
    const updating = updateCache(contentName)
    const [updatedCache, setUpdatedCache] =
        useState<ContentCacheModel>(DefaultContentCacheModel)
    useEffect(() => {

        let [cache, cacheIsValid] = pullCache(contentName)
        if (!updating && cacheIsValid) setUpdatedCache(cache)

    }, [updating]);


    return [updatedCache.data, updating]
}

// pullCache pulls the cache from local storage and boolean if the data as valid
function pullCache(contentName: string): [ContentCacheModel, boolean] {
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

function updateCache(contentName: string): boolean {
    const [updatedCache, loading] =
        useFetchObject<ContentCacheModel>(DefaultContentCacheModel,
            `/api/content_cache?content_name=${contentName}`)

    useEffect(() => {
        if (loading) return

        localStorage.setItem(contentName, JSON.stringify(updatedCache))
    }, [loading]);

    return loading
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
