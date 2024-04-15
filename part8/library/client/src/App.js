import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Authors from './components/Authors'
import Books from './components/Books'
import Menu from './components/Menu'
import NewBook from './components/NewBook'

const App = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
