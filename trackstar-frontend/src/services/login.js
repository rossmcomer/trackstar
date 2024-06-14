import axios from '../util/apiClient'
const baseUrl = '/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
