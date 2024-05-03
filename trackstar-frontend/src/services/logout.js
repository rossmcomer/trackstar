import axios from '../util/apiClient'
const baseUrl = '/api/logout'

const logout = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { logout }
