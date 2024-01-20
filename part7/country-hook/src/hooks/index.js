import { useEffect, useState } from 'react'

import countryService from '../services/countries'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return { type, value, onChange }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const search = async (name) => {
      try {
        const countryInfo = await countryService.getOne(name)
        setCountry({ found: true, data: countryInfo })
      } catch (exception) {
        console.log(exception.response.data.error)
        setCountry({ found: false })
      }
    }

    if (name)
      search(name)
  }, [name])

  return country
}
