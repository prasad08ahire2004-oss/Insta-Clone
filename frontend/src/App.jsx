import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Feed from './features/post/pages/Feed'
import CreatePost from './features/post/pages/CreatePost'

const App = () => {
  return (
    <div className=''>

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='*' element={<Navigate to='/' replace />} />

      </Routes>
      
    </div>
  )
}

export default App
