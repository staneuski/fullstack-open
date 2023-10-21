const Filter = ({ handleQueryChange, query }) => {
  // console.log(`query=${query}`)
  return (
    <form>
      find countries: <input value={query} onChange={handleQueryChange} />
    </form>
  )
}

export default Filter
