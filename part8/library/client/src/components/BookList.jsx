import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const BookList = ({ genre }) => {
  const result = useQuery(ALL_BOOKS, { variables: { genre } })
  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map((book) => (
          <tr key={book.title}>
            <td>{book.title}</td>
            <td>{book.author.name}</td>
            <td>{book.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BookList
