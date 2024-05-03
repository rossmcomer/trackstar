import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.BACKEND_URL || 'http://localhost:3001'
})

export default apiClient