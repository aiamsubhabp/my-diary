import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import './App.css'


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/api/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  if (!user) return <Login onLogin = {setUser} />
  

  return (
    <h1>App Comp - Signed In - This should go to home page</h1>
 
  )
}

export default App
