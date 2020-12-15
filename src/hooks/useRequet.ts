import { AxiosRequestConfig } from 'axios'
import { QueryResult, useQuery } from 'react-query'
import { request } from '../services/requestService'
import * as _ from 'lodash'

export const useRequest = <T>(url: string, requestConfig?: AxiosRequestConfig)
: QueryResult<T> => {
  const fnRequest = async (): Promise<T> => {
    const data = new URLSearchParams(requestConfig?.data)
    const newRequestConfig = _.merge({}, requestConfig, {
      method: 'get',
      url: `${url}?${data}`,
    })
    const result = await request(newRequestConfig)
    if (result.data.status === 'error') {
      throw result.data.message
    }
    return result.data.message
  }

  return useQuery<T>(url, fnRequest, {
    forceFetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}
