import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { logout } from '../reducers/user'
import userService from '../services/user'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    let token = userService.getToken()
    dispatch(logout(token))
    navigate('/')
  }, [])
}

export default Logout