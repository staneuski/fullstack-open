import { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import { Routes, Route } from 'react-router-dom'

import { ALL_BOOKS, BOOK_ADDED } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import Menu from './components/Menu'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Recommendations from './components/Recommendations'
import { updateCache } from './utils/helpers'

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

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  return (
    <div>
      <Menu token={token} logout={logout} />
      <Notification message={notification} />
      <Routes>
        <Route path="/authors" element={<Authors setNotification={notify} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook setNotification={notify} />} />
        <Route path="/recommend" element={<Recommendations />} />
        <Route
          path="/login"
          element={<LoginForm setNotification={notify} setToken={setToken} />}
        />
      </Routes>
    </div>
  )
}

export default App
