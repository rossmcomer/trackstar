import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'
import { useNavigate } from 'react-router-dom'

import loginService from '../services/login'
import userService from '../services/user'
import favoriteService from '../services/favorites'

import { notify } from '../reducers/notification'
import { setUser } from '../reducers/user'
import { initializeFavorites } from '../reducers/favorites'

const Login = () => {
  const username = useField('text')
  const password = useField('password')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    navigate('/logout')
  }

  if (user) {
    return (
      <div id="logoutContainer">
        <button onClick={handleLogout} id="logout-button">
          Logout
        </button>
      </div>
    )
  }

  const handleLogin = (event) => {
    event.preventDefault()
    loginService
      .login({
        username: username.fields.value.toLowerCase(),
        password: password.fields.value,
      }) //logs in on the backend
      .then((user) => {
        userService.setUser(user) //sets localstorage STORAGE_KEY
        favoriteService.setToken(user.token) //sets headers.Authorization token
        dispatch(setUser(user)) //sets state of User
        // .then(() => {
        //   dispatch(initializeFavorites())
        // })
        dispatch(initializeFavorites())
        navigate('/')
        dispatch(notify('Successfully logged in', 'success', 10))
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          dispatch(
            notify(
              'Username not found.  Please create an account.',
              'error',
              10,
            ),
          )
        } else {
          dispatch(notify('Wrong username or password', 'error', 10))
        }
      })
  }

  return (
    <div className="loginContainer">
      <h2 className="loginHeader">Log in</h2>

      <form onSubmit={handleLogin} className="loginForm">
        <div className="inputContainer">
          Username:
          <input {...username.fields} placeholder="example@domain.com" />
        </div>
        <div className="inputContainer">
          Password:
          <input {...password.fields} placeholder="password" />
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
