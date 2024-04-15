import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK } from '../queries'
import { useField } from '../hooks'

const NewBook = ({ setNotification }) => {
  const [author, resetAuthor] = useField('text', 'author')
  const [genre, resetGenre] = useField('text', 'genre')
  const [published, resetPublished] = useField('number', 'published')
  const [title, resetTitle] = useField('text', 'title')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n')
      setNotification(messages)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    addBook({
      variables: {
        author: author.value,
        genres,
        published: parseInt(published.value),
        title: title.value
      }
    })

    setNotification(`${title.value} created`)
    resetAuthor()
    resetGenre()
    resetPublished()
    resetTitle()
    setGenres([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.value))
    resetGenre()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input {...title} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          published
          <input {...published} />
        </div>
        <div>
          <input {...genre} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
