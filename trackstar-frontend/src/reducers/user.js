import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'
import favoriteService from '../services/favorites'
import logoutService from '../services/logout'
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
    const user = await userService.getUser()
    dispatch(setUser(user))
  }
}

export const logout = () => {
  return async (dispatch) => {
    let token = await userService.getToken()
    logoutService.logout(token) //sends information to backend
    userService.clearUser() //removes from localstorage and makes user token=null
    favoriteService.setToken(null) //sets favorite token = null
    dispatch(clearUser()) // clears user state
    dispatch(notify('Successfully logged out', 'success', 10))
  }
}

export default userSlice.reducer