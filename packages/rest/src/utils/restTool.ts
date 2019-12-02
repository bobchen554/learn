import { RequestConfig } from '../types'

// 非正常规则的Header
const EXCEPTIONS = {
    'content-md5': 'Content-MD5',
    dnt: 'DNT',
    etag: 'ETag',
    'last-event-id': 'Last-Event-ID',
    tcn: 'TCN',
    te: 'TE',
    'www-authenticate': 'WWW-Authenticate',
    'x-dnsprefetch-control': 'X-DNSPrefetch-Control',
}

export function normalizeHeaderName(name: string): string {
    const except = EXCEPTIONS[name.toLowerCase()]
    if (except) return except

    return name
        .split('-')
        .map(word => `${word.charAt(0).toUpperCase()}${word.substr(1).toLowerCase()}`)
        .join('-')
}

export function normalizeHeaders(
    headers: { [key: string]: string },
): { [key: string]: string } {
    const ret = {}
    Object.keys(headers)
        .forEach(name => {
            ret[normalizeHeaderName(name)] = headers[name]
        })
    return ret
}



export function mergeConfig(
    source: RequestConfig,
    ext: RequestConfig,
) {
    const config: RequestConfig = Object.assign({}, source, ext)

    // shallow merge headers
    config.headers = Object.assign({}, source.headers || {}, ext.headers || {})

    return config
}
