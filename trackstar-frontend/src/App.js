import './App.css'
import React from 'react'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  Link,
  useNavigate,
} from 'react-router-dom'
import favoriteService from './services/favorites'
import loginService from './services/login'
import userService from './services/user'
import { notify } from './reducers/notification'
import {
  initializeFavorites,
  createFavorite,
  removeFavorite,
} from './reducers/favorites'
import { setUser } from './reducers/user'
import { useNotification, useInitialization, useClearUser } from './hooks'

import Header from './components/Header'
import Markets from './components/Markets'
import Favorites from './components/Favorites'
import Login from './components/Login'
import Notification from './components/Notification'

function App() {
  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  const stateInitializer = useInitialization()
  // const notifyWith = useNotification()
  // const clearUser = useClearUser()
  // const favorites = useSelector(state => state.favorites)
  //const user = useSelector(state => state.user)
  const user = null

  useEffect(() => {
    stateInitializer()
    console.log(user)
  }, [])

  // const handleLogin = async (username, password) => {
  //   try {
  //     const user = await loginService.login({ username, password })
  //     userService.setUser(user)
  //     favoriteService.setToken(user.token)
  //     dispatch(setUser(user))
  //     navigate('/')
  //     notifyWith(`Successfully logged in as ${user}.`)
  //   } catch (e) {
  //     notifyWith('Wrong username or password', 'error')
  //   }
  // }

  // const handleLogout = () => {
  //   clearUser()
  //   navigate('/')
  //   notifyWith('User successfully logged out')
  // }

  // const handleAddFavorite = async (newFavorite) => {
  //   try {
  //     dispatch(createFavorite(newFavorite))
  //     notifyWith(`Added ${newFavorite.title}`)
  //   } catch (e) {
  //     notifyWith(e.response.data.error, 'error')
  //   }
  // }

  return (
    <Router>
      <div className="App">
        <div>
          <Header user={user} />
          <Notification />
        </div>
        <Routes>
          <Route path="/" element={<Markets />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/sentiment" element={<Markets />} />
          <Route path="/contact" element={<Markets />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
