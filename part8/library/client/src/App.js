import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import Menu from './components/Menu'
import NewBook from './components/NewBook'
import Notification from './components/Notification'

const App = () => {
  const [notification, setNotification] = useState(null)

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <Menu />
      <Notification message={notification} />
      <Routes>
        <Route path="/authors" element={<Authors setNotification={notify} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook setNotification={notify} />} />
      </Routes>
    </div>
  )
}

export default App
