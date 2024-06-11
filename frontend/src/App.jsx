import './index.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext'
import Dashboard from './pages/Dashboard'


axios.defaults.baseURL= 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position='bottom-right' 
      toastOptions={{
      duration: 2000,
      style: {
        minWidth: '300px',
        padding: '16px', 
        fontSize: '16px', 
      }
      }} 
      />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path={'/dashboard'} element={<Dashboard />}/>
        </Routes>
    </UserContextProvider>
  )
}

export default App
