import { useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../queries'
import { useField } from '../hooks'

const LoginForm = ({ setNotification, setToken }) => {
  const [username, resetUsername] = useField('username', 'username') // 'librarian'
  const [password, resetPassword] = useField('current-password', 'password') // 'secret'

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setNotification(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data, setToken])

  const submit = async (event) => {
    event.preventDefault()
    login({
      variables: {
        username: username.value,
        password: password.value
      }
    })
    resetUsername()
    resetPassword()
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input {...username} />
        </div>
        <div>
          password <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
