import * as _ from 'lodash'
import useTaskParams, { ITaskParamsResult } from './useTaskParams'

const useGenerateLink = (): (newParams: ITaskParamsResult) => string => {
  const params = useTaskParams()

  return newParams => {
    const mergeParams = _.assign({}, params, newParams) as Record<string, string>
    return '?' + new URLSearchParams(mergeParams).toString()
  }
}

export default useGenerateLink
