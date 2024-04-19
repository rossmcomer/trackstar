import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Markets from './components/Markets'

function App() {
  let user = null
  return (
    <Router>
      <div className="App">
        <div>
          <Header user={user}/>
        </div>
      <Routes>
        <Route path="/" element={<Markets/>}/>
        <Route path="/markets" element={<Markets/>}/>
        <Route path="/favorites" element={<Markets/>}/>
        <Route path="/sentiment" element={<Markets/>}/>
        <Route path="/contact" element={<Markets/>}/>
        <Route path="/login" element={<Markets/>}/>
      </Routes>
      </div>
    </Router>
  );
}

export default App
