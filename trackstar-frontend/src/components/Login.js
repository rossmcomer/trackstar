import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { useNavigate } from 'react-router-dom'

import loginService from '../services/login'
import userService from '../services/user'
import favoriteService from '../services/favorites'

import { notify } from '../reducers/notification'
import { setUser } from '../reducers/user'

const Login = () => {
  const username = useField('text')
  const password = useField('password')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
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
        navigate('/')
        dispatch(notify(`Signed in as ${user.username}`, 'success', 10))
      })
      .catch(() => {
        dispatch(notify('Wrong username or password', 'error', 10))
      })
  }

  return (
    <div id="loginContainer">
      <h2 id="loginHeader">Log in</h2>

      <form onSubmit={handleSubmit} id="loginForm">
        <div className="inputContainer">
          Username:
          <input {...username.fields} placeholder="example@domain.com" />
        </div>
        <div className="inputContainer">
          Password:
          <input {...password.fields} placeholder="password" />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
