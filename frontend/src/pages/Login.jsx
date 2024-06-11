import { useState } from "react"
import axios from 'axios'
import toast from "react-hot-toast"
import {Navigate, useNavigate} from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  const [data,setData] = useState({
    email:'',
    password:'',
  })
  const loginUser = async (e) => {
    e.preventDefault()
    const {email,password} = data
    try {
      const {data} = await axios.post('/login',{
        email,
        password
      }) 
      if(data.error) {
        toast.error(data.error)
      }else {
        setData({})
        toast.success('Login succesful. Redirecting....')
        navigate('/dashboard')
      }
    } catch (error){
      console.log(error)
    }
  }

  return (
  <div className="flex justify-center items-center h-screen">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3" onSubmit={loginUser}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Enter email"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="Enter password"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  </div>
  )
}
