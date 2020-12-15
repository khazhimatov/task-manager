import React, { ReactElement } from 'react'
import { Provider as ReduxProvuder } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import ReactNotification from 'react-notifications-component'
import AppRoutes from '../../routes/AppRoutes'
import store from '../../store'

import '../../styles/normalize.css'
import 'react-notifications-component/dist/theme.css'
import { useLogout } from '../../hooks/useLogout'
const queryCache = new QueryCache()

const App = (): ReactElement => {
  useLogout()

  return <>
    <ReactNotification />
    <Router>
      <AppRoutes />
    </Router>
  </>
}

const AppWithProviders = (): ReactElement =>
  <ReduxProvuder store={store}>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <App />
    </ReactQueryCacheProvider>
  </ReduxProvuder>


export default AppWithProviders
