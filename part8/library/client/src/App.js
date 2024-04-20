import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { Routes, Route } from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import Menu from './components/Menu'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
  const client = useApolloClient()

  const [notification, setNotification] = useState(null)
  const [token, setToken] = useState(null)

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('user-token')
    client.resetStore()
  }

  return (
    <div>
      <Menu token={token} logout={logout} />
      <Notification message={notification} />
      <Routes>
        <Route path="/authors" element={<Authors setNotification={notify} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook setNotification={notify} />} />
        <Route
          path="/login"
          element={
            !token ? (
              <LoginForm setNotification={notify} setToken={setToken} />
            ) : (
              <></>
            )
          }
        />
      </Routes>
    </div>
  )
}

export default App
