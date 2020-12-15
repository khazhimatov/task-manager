import React, { ReactElement } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import TasksPage from '../pages/TasksPage'

function AppRoutes(): ReactElement {
  return (
    <Switch>
      <Route
        path={'/'}
        component={TasksPage} exact/>
      <Route path="/login" component={LoginPage} exact />
      <Redirect to="/" />
    </Switch>
  )
}

export default AppRoutes
