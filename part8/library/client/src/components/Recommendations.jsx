import { useQuery } from '@apollo/client'

import { USER } from '../queries'

import BookList from './BookList'

const Recommendations = () => {
  const result = useQuery(USER)
  if (result.loading) {
    return <div>loading...</div>
  }

  const genre = result.data.me.favoriteGenre
  return (
    <div>
      <h2>recommendations</h2>
      books in your favourite genre <b>{genre}</b>
      <BookList genre={genre} />
    </div>
  )
}

export default Recommendations
