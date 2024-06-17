import axios from '../util/apiClient'
const baseUrl = '/api/create-account'

const createAccount = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { createAccount }
