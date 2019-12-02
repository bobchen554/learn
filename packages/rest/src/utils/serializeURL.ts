import { stringify } from 'query-string'
import { isURLSearchParams } from './'

export default function serializeParams(
  url: string,
  params: any,
  serializer: (params: any) => string,
): string {
  if (!params) {
    return url
  }

  let searchString
  if (serializer) {
    searchString = serializer(params)
  } else if (isURLSearchParams(params)) {
    searchString = params.toString()
  } else {
    searchString = stringify(params, { encode: false })
  }

  if (searchString) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + searchString
  }

  return url
}
