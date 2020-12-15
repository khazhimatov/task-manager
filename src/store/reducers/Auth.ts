import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: '',
}

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login(state, { payload }: { payload: string }) {
      state.accessToken = payload
    },
    logout(state) {
      state.accessToken = ''
    },
  },
})

export default authSlice
export const { login, logout } = authSlice.actions
