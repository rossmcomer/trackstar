import './App.css'
import React from 'react'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useInitialization } from './hooks'

import Header from './components/Header'
import Markets from './components/Markets'
import Favorites from './components/Favorites'
import Login from './components/Login'
import Loggedin from './components/Loggedin'
import Logout from './components/Logout'
import CreateAccount from './components/CreateAccount'
import Notification from './components/Notification'

function App() {
  const stateInitializer = useInitialization()

  useEffect(() => {
    stateInitializer()
  }, [])

  return (
    <Router>
      <div className="App">
        <div>
          <Notification />
          <Header />
          <Loggedin />
        </div>
        <Routes>
          <Route path="/" element={<Markets />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="/login"
            element={
              <>
                <Login />
                <CreateAccount />
              </>
            }
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
