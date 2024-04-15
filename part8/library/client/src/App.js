import { Routes, Route } from 'react-router-dom'

import Authors from './components/Authors'
import AuthorEdit from './components/AuthorEdit'
import Books from './components/Books'
import Menu from './components/Menu'
import NewBook from './components/NewBook'

const App = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route
          path="/authors"
          element={
            <div>
              <Authors />
              <AuthorEdit />
            </div>
          }
        />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
