import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notification'
import favoritesReducer from './reducers/favorites'
import userReducer from './reducers/user'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    favorites: favoritesReducer,
    user: userReducer,
  },
})

export default store
