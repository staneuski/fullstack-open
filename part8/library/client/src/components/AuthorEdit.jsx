import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

import { useField } from '../hooks'

const AuthorEdit = () => {
  const [author, resetAuthor] = useField('text', 'author')
  const [born, resetBorn] = useField('number', 'born')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({
      variables: { name: author.value, setBornTo: parseInt(born.value) }
    })

    resetAuthor()
    resetBorn()
  }

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input {...author} />
        </div>
        <div>
          year
          <input {...born} />
        </div>
        <div>
          <button type="submit">update author</button>
        </div>
      </form>
    </>
  )
}

export default AuthorEdit
