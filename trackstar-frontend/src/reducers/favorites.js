import favoriteService from '../services/favorites'

const favoritesReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_FAVORITE':
    return [...state, action.data]
  case 'REMOVE':
    return state.filter((b) => b.id !== action.data)
  case 'INIT_FAVORITES':
    return action.data
  default:
    return state
  }
}

export const createFavorite = (object) => {
  return async (dispatch) => {
    const newFavorite = await favoriteService.create(object)
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
    const favorites = await favoriteService.getAll()
    console.log(favorites)
    dispatch({
      type: 'INIT_FAVORITES',
      data: favorites,
    })
  }
}

export default favoritesReducer
