const Numbers = ({ persons }) => {
  // console.log('Numbers', persons)
  return (
    <>
      <h2>Numbers</h2>
      <div>
        {persons.map(({ id, name, number }) =>
          <p key={id}> {name} {number}</p>)}
      </div>
    </>
  )
}

export default Numbers
