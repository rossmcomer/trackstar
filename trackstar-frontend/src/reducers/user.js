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
    try {
      let token = await userService.getToken()
      await logoutService.logout(token)
      userService.clearUser()
      favoriteService.setToken(null)
      dispatch(clearUser())
      dispatch(notify('Successfully logged out', 'success', 10))
    } catch (error) {
      dispatch(notify('Error logging out. Please try again.', 'error', 10))
      console.error(error)
    }
  }
}

export default userSlice.reducer
