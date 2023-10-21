const Country = (info) => {
  console.log(info.languages)

  const languages = !Array.isArray(info.languages)
    ? Object.values(info.languages)
    : info.languages
  return (
    <>
      <h2>{info.name.common}</h2>
      <h4>Official name: {info.name.official}</h4>
      <div>capital {info.capital.join(', ')}</div>
      <ul>
        {languages.map((lang, id) => <li key={id}>{lang}</li>)}</ul>
      <img width="300" src={info.flags.svg} alt="Country flag"></img>
    </>
  )
}

export default Country
