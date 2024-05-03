import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/user'
import { useField } from '../hooks'
import { useNavigate } from 'react-router-dom'

import loginService from '../services/login'
import userService from '../services/user'
import favoriteService from '../services/favorites'
import { notify } from '../reducers/notification'

const Login = () => {
  const username = useField('text')
  const password = useField('password')

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const navigate = useNavigate()
    loginService
      .login({
        username: username.fields.value,
        password: password.fields.value,
      })
      .then((user) => {
        userService.setUser(user)
        favoriteService.setToken(user.token)
        dispatch(setUser(user))
        navigate('/')
        dispatch(notify(`Signed in as ${user.username}`))
      })
      .catch(() => {
        notify('Wrong username or password', 'error')
      })
  }

  return (
    <div>
      <h2>Log in to Trackstar</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Username:
          <input {...username.fields} />
        </div>
        <div>
          Password:
          <input {...password.fields} />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
