import { HttpRequestConfig } from './'
import { HttpResponse } from '../dispatchRequest'

function convertHeaders(headers: Headers) {
  const ret = {}
  headers.forEach((v, k) => ret[k] = v)
  return ret
}

export default async function universalHttp<T = any>(
  config: HttpRequestConfig,
): Promise<HttpResponse<T>> {
  const response = await fetch(config.url, {
    method: config.method,
    headers: config.headers,
    body: config.data,
    credentials: 'same-origin',
  })

  const httpResponse: HttpResponse = {
    config,
    ok: response.ok,
    data: null,
    status: response.status,
    statusText: response.statusText,
    headers: convertHeaders(response.headers),
    usingCache: false,
  }

  const contentType = response.headers.get('content-type')
  if (/application\/json/.test(contentType)) {
    // 读取 json
    httpResponse.data = await response.json()
    // 读取 text
  } else if (/text\/.+/.test(contentType)) {
    httpResponse.data = await response.text()
  } else if (/stream/.test(contentType)) {
    httpResponse.data = await response.blob()
  } else {
    let data

    try {
      data = await response.json() // 尝试转 json
      if (!data) data = await response.text() // 尝试转 text
    } catch (e) { }

    httpResponse.data = data
  }

  return httpResponse
}
