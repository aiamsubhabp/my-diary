import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import './App.css'
import EntryList from './pages/EntryList'
import NewEntry from './pages/NewEntry'
import NavBar from './components/NavBar'
import EditEntry from './components/EditEntry'

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
      <NavBar user={user} setUser = {setUser} />
      <Routes>
        <Route path='/' element={<Navigate to='/entries' />}></Route>
        <Route path='/entries' element = {<EntryList entries = {entries} setEntries={setEntries}/>} />
        <Route path='/new_entry' element = {<NewEntry entries = {entries} setEntries = {setEntries}/>} />
        <Route path='/edit_entry/:id' element = {<EditEntry entries = {entries} setEntries = {setEntries} />} />
      </Routes>
    </Router>
 
  )
}

export default App
