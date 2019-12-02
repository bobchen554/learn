import { RequestConfig } from './types'
import {
  isFormData,
  isArrayBuffer,
  isStream,
  isFile,
  isBlob,
  isUndefined,
  isArrayBufferView,
  isURLSearchParams,
  isObject,
} from './utils'
import fetchAdapter from './adapters/fetch'

function transformRequest(data: any, headers) {
  if (
    isFormData(data) ||
    isArrayBuffer(data) ||
    isStream(data) ||
    isFile(data) ||
    isBlob(data)
  ) {
    return data
  }
  if (isArrayBufferView(data)) {
    return data.buffer
  }
  if (isURLSearchParams(data)) {
    if (isUndefined(headers['Content-Type'])) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    }
    return data.toString()
  }
  if (isObject(data)) {
    if (isUndefined(headers['Content-Type'])) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
    return JSON.stringify(data)
  }
  return data
}

const defaults: RequestConfig = {
  transformRequest,
  adapter: fetchAdapter,
  url: '',
  method: 'GET',
  headers: {},
  cache: 'default',
  validateStatus: status => status >= 200 && status < 300,
}

export default defaults
