import { useEffect, useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return { type, value, onChange }
}

export const useCountry = (name) => {
  // eslint-disable-next-line no-unused-vars
  const [country, setCountry] = useState(null)

  useEffect(() => {})

  return country
}
