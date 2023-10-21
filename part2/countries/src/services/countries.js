import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

/**
 * Get all countries list
 * @returns {Object} response
 */
const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  console.log(request)
  return request
    .then(response => response.data)
    .catch(error => { console.log(`GET: error=${error}`) })
}

/**
 * Search by country’s name
 * @param {string} name common or official full name
 * @returns {Object} response
 */
const getInfo = name => {
  const request = axios.get(`${baseUrl}/name/${name}`)
  console.log(request)
  return request
    .then(response => response.data)
    .catch(error => { console.log(`GET: error=${error}`) })
}

export default { getAll, getInfo }
