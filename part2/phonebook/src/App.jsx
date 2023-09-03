import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [query, setQuery] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newNameStripped = newName.replace(/\s+/g, ' ').trim()
    const newNumberStripped = newNumber.replace(/\s+/g, ' ').trim()

    if (persons.some(({ name }) => name === newNameStripped)) {
      alert(`${newNameStripped} is already added to phonebook`)
      return
    }

    personService
      .create({
        name: newNameStripped,
        number: newNumberStripped
      })
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter
        handleQueryChange={(event) => setQuery(event.target.value)}
        query={query}
      />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={addPerson}
        handleNameChange={(event) => setNewName(event.target.value)}
        name={newName}
        handleNumberChange={(event) => setNewNumber(event.target.value)}
        number={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} query={query.toLowerCase()} />
    </>
  )
}

export default App
