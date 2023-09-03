import personService from '../services/persons'

const Person = ({ handleDelete, name, number }) => {
  // console.log(name, number)
  return (
    <form onSubmit={handleDelete}>
      <p>{name} {number} <button type="delete">delete</button></p>
    </form>
  )
}

const Persons = ({ deletePerson, persons, query }) => {
  // console.log('Persons', persons)
  return (
    <div>{
      (query !== ''
        ? persons.filter(({ name }) => name.toLowerCase().includes(query))
        : persons
      ).map(({ id, name, number }) =>
        <Person key={id}
                handleDelete={(event) => deletePerson(event, id)}
                name={name} number={number}/>
      )
    }</div>
  )
}

export default Persons
