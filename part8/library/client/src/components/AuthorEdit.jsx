import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

import { useField } from '../hooks'

const AuthorEdit = ({ names, setNotification }) => {
  const [author, resetAuthor] = useField('text', 'author')
  const [born, resetBorn] = useField('number', 'born')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n')
      setNotification(messages)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({
      variables: { name: author.value, setBornTo: parseInt(born.value) }
    })

    setNotification(`Birth year updated for ${author.value}`)
    resetAuthor()
    resetBorn()
  }

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select {...author}>
          {names.map((name, i) => (
            <option key={i} value={name}>
              {name}
            </option>
          ))}
        </select>
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
