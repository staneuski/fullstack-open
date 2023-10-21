import { useState, useEffect } from 'react'

import Countries from './components/Countries'
import Filter from './components/Filter'

import countryService from './services/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  useEffect(() => {
    countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
        // console.log(countries)
      })
    }, [])

  const [info, setInfo] = useState(null)
  const updateInfo = (event, officialName) => {
    event.preventDefault()
    countryService
      .getInfo(officialName)
      .then(info => setInfo(info))
  }

  return (
    <>
      <Filter
        handleQueryChange={(event) => {
          setQuery(event.target.value)
          setInfo(null)
        }}
        query={query}
      />
      <Countries
        countries={countries}
        query={query.toLowerCase()}
        updateInfo={updateInfo}
        info={info}
      />
    </>
  )
}

export default App
