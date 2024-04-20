import { Link } from 'react-router-dom'

const Menu = ({ token, logout }) => {
  const padding = { paddingRight: 5 }
  return (
    <div>
      <Link to="/authors" style={padding}>
        authors
      </Link>
      <Link to="/books" style={padding}>
        books
      </Link>
      <>
        {!token ? (
          <Link to="/login" style={padding}>
            login
          </Link>
        ) : (
          <>
            <Link to="/add" style={padding}>
              add book
            </Link>
            <button onClick={logout}>logout</button>
          </>
        )}
      </>
    </div>
  )
}

export default Menu
