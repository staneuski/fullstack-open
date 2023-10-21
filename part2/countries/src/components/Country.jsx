import { useState } from 'react' 

import weatherService from '../services/weather'

const Country = (info) => {
  const capitalCoords = info.capitalInfo.latlng
  const [weather, setWeather] = useState(() => {
    weatherService
      .getCurrent(capitalCoords[0], capitalCoords[1])
      .then(data => setWeather(data))
  })
  console.log(weather)

  const languages = !Array.isArray(info.languages)
    ? Object.values(info.languages)
    : info.languages
  return (
    <>
      <h2>{info.name.common}</h2>
      <h4>Official name: {info.name.official}</h4>
      <div>capital {info.capital.join(', ')}</div>
      <ul>
        {languages.map((lang, id) => <li key={id}>{lang}</li>)}
      </ul>
      <img src={info.flags.svg} alt="Country flag" height="150"></img>
      <h3>Weather in {info.capital[0]}</h3>
      {
        weather &&
        <>
          <div>temperature {weather.main.temp}˚C</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="Wheather icon">
          </img>
          <div>wind {weather.wind.speed} m/s</div>
        </>
      }
    </>
  )
}

export default Country
