import favoriteService from '../services/favorites'
import userService from '../services/user'

const favoritesReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_FAVORITE':
    return [...state, action.data]
  case 'REMOVE':
    return state.filter((f) => f.coingeckoId !== action.data)
  case 'INIT_FAVORITES':
    return action.data
  default:
    return state
  }
}

export const createFavorite = (id) => {
  return async (dispatch) => {
    const newFavorite = await favoriteService.create({ id })
    dispatch({
      type: 'NEW_FAVORITE',
      data: newFavorite,
    })
  }
}

export const removeFavorite = (id) => {
  return async (dispatch) => {
    await favoriteService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id,
    })
  }
}

export const initializeFavorites = () => {
  return async (dispatch) => {
    const user = await userService.getUser()
    if (user) {
      const favorites = await favoriteService.getAll()
      dispatch({
        type: 'INIT_FAVORITES',
        data: favorites,
      })
    }
  }
}

export default favoritesReducer
