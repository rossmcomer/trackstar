/* eslint-disable no-unused-vars */

import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

const initialState = { message: null }

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotif: (state, action) => action.payload,
    clearNotif: (state, action) => initialState,
  },
})

export const notify = (message, type, duration) => {
  return async (dispatch) => {
    dispatch(setNotif({ message, type }))
    toast(message)
    setTimeout(() => {
      dispatch(clearNotif())
    }, duration * 1000)
  }
}

export const { setNotif, clearNotif } = slice.actions
export default slice.reducer
