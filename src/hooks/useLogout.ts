import { useDispatch } from './useDispatch'
import { logout as logoutAction } from '../store/reducers/Auth'
import { useBroadcastChannel } from './useBroadcastChannel'

export function useLogout(): () => void {
  const dispatch = useDispatch()

  const listener = (): void => {
    dispatch(logoutAction())
  }
  const [logout] = useBroadcastChannel('logout', listener)

  return () => {
    logout('logout'); listener()
  }
}
