import { AxiosRequestConfig, Method } from 'axios'
import { MutationResult, useMutation } from 'react-query'
import { request } from '../services/requestService'
import * as _ from 'lodash'

export type RequestErrorType = Record<string, string>

export type ValuesPropsType = FormData | Record<string, string>

export type IrequestAPI<T> =
  Record< Method, (values: ValuesPropsType) => Promise<T> >

export const useRequestMutation =
<T>(url: string | (() => string), requestConfig?: AxiosRequestConfig)
: [IrequestAPI<T>, MutationResult<T, RequestErrorType>] => {

  const fnRequest = async (config: AxiosRequestConfig): Promise<T> => {
    const newRequestConfig = _.merge({}, requestConfig, config)
    const result = await request(newRequestConfig)

    if (result.data.status === 'error') {
      throw result.data.message
    } else if (result.data.message) {
      return result.data.message
    }
    return result.data.status
  }

  const [mutation, result] =
  useMutation<T, RequestErrorType, AxiosRequestConfig, ValuesPropsType>(fnRequest)

  const requestApi = new Proxy(mutation, {
    get: (target: typeof mutation, property: Method) =>
      (values: ValuesPropsType) => {
        if (typeof url === 'function') {
          url = url()
        }

        if (property === 'get' && !(values instanceof FormData)) {
          const dataParams = new URLSearchParams(values)
          url = `${url}?${dataParams}`
          return target({ method: property, url })
        }
        return target({ method: property, url , data: values })
      },
  })

  return [requestApi as unknown as IrequestAPI<T>, result]
}
