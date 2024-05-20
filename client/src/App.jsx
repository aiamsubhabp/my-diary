import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import './App.css'
import EntryList from './pages/EntryList'


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
    <Router>
      <Routes>
        <Route path='/entries' element = {<EntryList />} />
      </Routes>
    </Router>
 
  )
}

export default App
