import React, { ReactElement } from 'react'
import Header from '../../components/Header'
import { useSelector } from '../../hooks/useSelector'
import { useLogout } from '../../hooks/useLogout'

function HeaderContainer(): ReactElement {
  const token = useSelector(state => state.auth.accessToken)
  const logout = useLogout()

  return (
    <Header isAuth={Boolean(token)} onLogout={logout}/>
  )
}

export default HeaderContainer
