import axios from '../util/apiClient'
const baseUrl = '/logout'

const logout = async (token) => {
  try {
    const response = await axios.delete(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response.data.error || 'Error logging out'
  }
}

export default { logout }
