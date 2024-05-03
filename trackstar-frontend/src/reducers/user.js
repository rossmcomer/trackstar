import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'
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
    const user = userService.getUser()
    dispatch(setUser(user))
  }
}

export const logout = () => {
  return async (dispatch) => {
    userService.clearUser()
    dispatch(clearUser())
    dispatch(notify('Logged out'))
  }
}

export default userSlice.reducer