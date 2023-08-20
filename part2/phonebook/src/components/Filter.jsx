const Filter = ({ handleQueryChange, query }) => {
  // console.log(name, number)
  return (
    <form>
      filter shown with: <input value={query} onChange={handleQueryChange} />
    </form>
  )
}

export default Filter
