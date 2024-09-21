import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'
import { useNavigate } from 'react-router-dom'

import createAccountService from '../services/createAccount'
import { notify } from '../reducers/notification'

const CreateAccount = () => {
  const username = useField('text')
  const password = useField('password')
  const confirm = useField('password')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  if (user) {
    return
  }

  const handleCreateAccount = (event) => {
    event.preventDefault()
    createAccountService
      .createAccount({
        username: username.fields.value.toLowerCase(),
        password: password.fields.value,
        confirm: confirm.fields.value,
      })
      .then(() => {
        username.reset()
        password.reset()
        confirm.reset()
        navigate('/login')
        dispatch(
          notify(
            'Account successfully created. Please sign in to continue.',
            'success',
            10,
          ),
        )
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          dispatch(notify('Username already exists.', 'error', 10))
        } else {
          dispatch(
            notify(
              'Passwords must match and username must be an e-mail address.',
              'error',
              10,
            ),
          )
        }
      })
  }

  return (
    <div className="signUpContainer">
      <h2 className="loginHeader">Sign Up</h2>

      <form onSubmit={handleCreateAccount} className="loginForm">
        <div className="inputContainer">
          Username:
          <input {...username.fields} placeholder="example@domain.com" className='inputBox'/>
        </div>
        <div className="inputContainer">
          Password:
          <input {...password.fields} placeholder="password" className='inputBox'/>
        </div>
        <div className="inputContainer">
          Confirm Password:
          <input {...confirm.fields} placeholder="confirm password"className='inputBox' />
        </div>
        <button className="login-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default CreateAccount
