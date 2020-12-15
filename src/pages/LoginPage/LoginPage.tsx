import React, { ReactElement } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import LoginContainer from '../../containers/LoginContainer'

function LoginPage(): ReactElement {
  return <AuthLayout>
    <LoginContainer />
  </AuthLayout>
}

export default LoginPage
