import { createSlice } from '@reduxjs/toolkit'
import storageService from '../services/storage'
import { notify } from './notification'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
  },
})

export const { setUser, clearUser } = userSlice.actions

export const initUser = () => {
  return async (dispatch) => {
    const user = storageService.loadUser()
    dispatch(setUser(user))
  }
}

export const logout = () => {
  return async (dispatch) => {
    storageService.removeUser()
    dispatch(clearUser())
    dispatch(notify('Logged out'))
  }
}

export default userSlice.reducer
