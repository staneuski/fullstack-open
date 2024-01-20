import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/all`)
  return response.data
}

const getOne = async (name) => {
  const response = await axios.get(`${baseUrl}/name/${name}`)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getOne }
