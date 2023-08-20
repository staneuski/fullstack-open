import { useState } from 'react'

import AddNumber from './components/AddNumber'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newNameStripped = newName.replace(/\s+/g, ' ').trim()
    const newNumberStripped = newNumber.replace(/\s+/g, ' ').trim()

    if (persons.some(({ name }) => name === newNameStripped)) {
      alert(`${newNameStripped} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({
      id: persons.length + 1,
      name: newNameStripped,
      number: newNumberStripped
    }))
    setNewName('')
    setNewNumber('')
  }

  return (
    <>
      <h2>Phonebook</h2>
      <AddNumber
        handleSubmit={addPerson}
        handleNameChange={(event) => setNewName(event.target.value)}
        name={newName}
        handleNumberChange={(event) => setNewNumber(event.target.value)}
        number={newNumber}
      />
      <Numbers persons={persons} />
    </>
  )
}

export default App
