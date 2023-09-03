import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  console.log(request)
  return request
    .then(response => response.data)
    .catch(error => { console.log(`GET: error=${error}`) })
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  console.log(request)
  return request
    .then(response => response.data)
    .catch(error => { console.log(`POST: error=${error}`) })
}
const deleteOf = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  console.log(request)
  return request
    .then(response => response.data)
    .catch(error => { console.log(`DELETE: error=${error}`) })
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  console.log(request)
  return request
    .then(response => response.data)
    .catch(error => { console.log(`PUT: error=${error}`) })
}

export default { getAll, create, deleteOf, update }
