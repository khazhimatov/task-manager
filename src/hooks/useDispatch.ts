import { createDispatchHook } from 'react-redux'
import { RootStateType } from '../store/index'

export const useDispatch = createDispatchHook<RootStateType>()
