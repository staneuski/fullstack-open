const Persons = ({ persons, query }) => {
  // console.log('Persons', persons)

  return (
    <div>
      {(query !== ''
        ? persons.filter(({ name }) => name.toLowerCase().includes(query))
        : persons
       ).map(({ id, name, number }) =>
        <p key={id}> {name} {number}</p>)}
    </div>
  )
}

export default Persons
