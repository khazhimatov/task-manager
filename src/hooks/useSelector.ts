import { createSelectorHook } from 'react-redux'
import { RootStateType } from '../store/index'

export const useSelector = createSelectorHook<RootStateType>()
