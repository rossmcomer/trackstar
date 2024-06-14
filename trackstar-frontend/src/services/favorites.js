import axios from '../util/apiClient'
import userService from '../services/user'

const baseUrl = '/favorites'

const headers = {
  Authorization: userService.getUser()
    ? `Bearer ${userService.getUser().token}`
    : null,
}

const setToken = (token) => {
  headers.Authorization = token ? `Bearer ${token}` : null
}

const getAll = async () => {
  const request = await axios.get(baseUrl, { headers })
  return request.data
}

const create = async (object) => {
  const request = await axios.post(baseUrl, object, { headers })
  return request.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers })
}

export default { getAll, create, remove, setToken }
