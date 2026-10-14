import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'

const App = () => {
  return (
    <div className=''>

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

      </Routes>
      
    </div>
  )
}

export default App
