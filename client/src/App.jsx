import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import './App.css'
import EntryList from './pages/EntryList'
import NewEntry from './pages/NewEntry'

function App() {
  const [user, setUser] = useState(null)
  const [entries, setEntries] = useState([])

  useEffect(() => {
      fetch("/api/entries")
          .then((r) => r.json())
          .then(data => setEntries(data))
  }, [user])

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
        <Route path='/' element={<Navigate to='/entries' />}></Route>
        <Route path='/entries' element = {<EntryList entries = {entries}/>} />
        <Route path='/new_entry' element = {<NewEntry entries = {entries} setEntries = {setEntries}/>} />
      </Routes>
    </Router>
 
  )
}

export default App
