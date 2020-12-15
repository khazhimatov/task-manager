import React, { ReactElement } from 'react'
import HeaderContainer from '../../containers/HeaderContainer/HeaderContainer'

export interface MainLayoutProps {
  children: React.ReactNode
}

function MainLayout({ children }: MainLayoutProps): ReactElement {
  return (
    <>
      <HeaderContainer />
      {children}
    </>
  )
}
export default MainLayout
