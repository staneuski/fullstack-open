import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  console.log(request)
  return request
    .then(response => response.data)
    .catch(error => { console.log('failed: GET') })
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  console.log(request)
  return request
    .then(response => response.data)
    .catch(error => { console.log('failed: POST') })
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  console.log(request)
  return request
    .then(response => response.data)
    .catch(error => { console.log('failed: PUT') })
}

export default { getAll, create, update }
