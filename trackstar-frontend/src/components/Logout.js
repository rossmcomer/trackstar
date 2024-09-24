import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { logout } from '../reducers/user'
import userService from '../services/user'
import { zeroFavorites } from '../reducers/favorites'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    let token = userService.getToken()
    try {
      dispatch(logout(token))
      dispatch(zeroFavorites())
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }, [])

  return
}

export default Logout
