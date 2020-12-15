import notNullObject from '../utils/notNullObject'
import { useLocation } from 'react-router'

export interface ITaskParamsResult {
  page?: string | number | null,
  sort_field?: string | null,
  sort_direction?: string | null,
}

const useTaskParams = (): ITaskParamsResult => {
  const location = useLocation()
  const search = new URLSearchParams(location.search)
  return notNullObject({
    page: search.get('page') ?? 1,
    sort_field: search.get('sort_field'),
    sort_direction: search.get('sort_direction'),
  })
}

export default useTaskParams
