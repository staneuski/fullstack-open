import { useQuery } from '@apollo/client'

import { ALL_BOOKS, USER } from '../queries'

const Recommendations = () => {
  const booksRes = useQuery(ALL_BOOKS)
  const userRes = useQuery(USER)
  if (booksRes.loading || booksRes.loading) {
    return <div>loading...</div>
  }

  const books = booksRes.data.allBooks
  const genre = userRes.data.me.favoriteGenre
  return (
    <div>
      <h2>recommendations</h2>
      books in your favourite genre <b>{genre}</b>
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

export default Recommendations
