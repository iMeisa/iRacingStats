export type ContentCacheModel = {
    content_type: string,
    data: Record<string, unknown>[],
    dataById: Record<number, Record<string, unknown>>
    hash: string,
}

export const DefaultContentCacheModel = {
    content_type: '',
    data: [{'': ''}],
    dataById: {0: {'':''}},
    hash: '',
}

export const DefaultContentCacheModelString = JSON.stringify(DefaultContentCacheModel)
