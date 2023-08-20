import { useState } from 'react'

const Person = ({ name }) => {
  // console.log("Person", name)
  return (
    <p>{name}</p>
  )
}

const Numbers = ({ persons }) => {
  // console.log('Numbers', persons)
  return (
    <>
      <h2>Numbers</h2>
      <div>
        {persons.map(({ name }, i) =>
          <Person key={i} name={name} />)}
      </div>
    </>
  )
}

const AddNumber = ({ handleSubmit, handleChange, name }) => {
  // console.log("Person", name)
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={name} onChange={handleChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newNameStripped = newName.replace(/\s+/g,' ').trim()

    if (persons.some(({ name }) => name === newNameStripped)) {
      alert(`${newNameStripped} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({ name: newNameStripped }))
    setNewName('')
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <AddNumber handleSubmit={addPerson}
        handleChange={handleNameChange}
        name={newName} />
      <Numbers persons={persons} />
    </>
  )
}

export default App
