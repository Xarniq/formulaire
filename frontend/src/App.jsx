import './index.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import Create from '../src/components/Create'
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
      duration: 4000,
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
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/createform' element={<Create />}/>
          <Route path="/createform/:id?" element={<Create />} />
        </Routes>
    </UserContextProvider>
  )
}

export default App
