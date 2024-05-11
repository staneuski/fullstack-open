import { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

import BookList from './BookList'

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
      <BookList genre={genre} />
    </div>
  )
}

export default Books
