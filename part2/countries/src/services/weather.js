import axios from 'axios'

const apiKey = import.meta.env.VITE_WEATHER_API
const baseUrl = 'https://api.openweathermap.org/data/2.5'

/**
 * Get current wheather data at location
 * @param {string} lat latitude
 * @param {string} lng longitude
 * @returns {Object} response
 */
const getCurrent = (lat, lng) => {
  console.log(`apiKey=${apiKey}`)

  const request = axios.get(
    `${baseUrl}/weather?lat=${lat}&lon=${lng}&APPID=${apiKey}&units=metric`
  )
  console.log(request)
  return request
    .then(response => response.data)
    .catch(error => { console.log(`GET: error=${error}`) })
}

export default { getCurrent }
