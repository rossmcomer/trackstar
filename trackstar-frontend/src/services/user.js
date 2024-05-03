let token = null

const STORAGE_KEY = 'TrackstarUser'

const setUser = (user) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

const getUser = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY))
}

const clearUser = () => {
  localStorage.removeItem(STORAGE_KEY)
  token = null
}

const getToken = () => token

export default { setUser, getUser, clearUser, getToken }
