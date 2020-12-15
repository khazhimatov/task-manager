import { save, load } from 'redux-localstorage-simple'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { request } from '../services/requestService'
import AuthSlice from './reducers/Auth'
import taskEditingHistorySlice from './reducers/TaskEditingHistory'

const STORE_NAMESPACE = 'task-manager'

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    taskEditingHistory: taskEditingHistorySlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [
    thunk.withExtraArgument({ request }),
    save({ namespace: STORE_NAMESPACE }),
  ],
  preloadedState: load({ namespace: STORE_NAMESPACE }),
})

export default store
export type RootStateType = ReturnType<typeof store.getState>
