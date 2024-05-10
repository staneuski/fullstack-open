import { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = () => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null)
  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = new Set(books.flatMap((book) => book.genres).sort())
  return (
    <div>
      <h2>books</h2>
      {genre ? (
        <>
          in genre <b>{genre}</b>
          <button onClick={() => setGenre(null)}>reset</button>
        </>
      ) : (
        [...genres].map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => (genre ? book.genres.includes(genre) : book))
            .map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
