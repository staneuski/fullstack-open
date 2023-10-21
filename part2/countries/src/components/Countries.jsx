import Country from './Country'

const CountryButton = ({ handleShow, name }) => {
  return (
    <form onSubmit={handleShow}>
      <p>{name} <button type="delete">show</button></p>
    </form>
  )
}

const Countries = ({ countries, query, updateInfo, info }) => {
  if (query === '')
    return <></>
  else if (info !== null)
    return Country(info)

  const foundCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(query) ||
    country.name.official.toLowerCase().includes(query)
  )
  if (foundCountries.length > 10)
    return (
      <div>
        Too many matches, specify another filter.
      </div>
    )
  else if (foundCountries.length === 1)
    return Country(foundCountries[0])

  console.log(foundCountries.map(country => country.name.official))
  return (
    <div>{
      // foundCountries.length > 1 &&
      foundCountries.map(({ ccn3, name }) =>
        <CountryButton
          key={ccn3}
          handleShow={event => 
            updateInfo(
              event,
              foundCountries.find(country => 
                country.ccn3 === ccn3
              ).name.official
            )
          }
          name={name.common}
        />
      )
    }
    </div>
  )
}

export default Countries
