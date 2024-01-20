const Country = ({ country }) => {
  console.log(country)

  if (!country)
    return null
  if (!country.found)
    return (<div>not found...</div>)

  return (<>
    <h3>{country.data.name.common}</h3>
    <div>capital {country.data.capital[0]}</div>
    <div>population {country.data.population}</div>
    <img
      src={country.data.flags.svg}
      alt={`flag of ${country.data.name}`}
      height='100'
    />
  </>)
}

export default Country