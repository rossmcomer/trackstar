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
import Loggedin from './components/Loggedin'
import Logout from './components/Logout'
import Notification from './components/Notification'

function App() {
  // const dispatch = useDispatch()
  // const navigate = useNavigate()
  const stateInitializer = useInitialization()
  // const clearUser = useClearUser()

  useEffect(() => {
    stateInitializer()
  }, [])

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
          <Header/>
          <Loggedin/>
          <Notification />
        </div>
        <Routes>
          <Route path="/" element={<Markets />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/contact" element={<Markets />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
