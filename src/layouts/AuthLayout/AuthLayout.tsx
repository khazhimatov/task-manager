import React, { ReactElement } from 'react'

import commonStyles from '../../styles/_.module.sass'

export interface AuthLayoutProps {
  children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps): ReactElement {
  return (
    <section
      className={`${commonStyles.container} ${commonStyles.flex} ${commonStyles.center}`}
    >
      {children}
    </section>
  )
}

export default AuthLayout
