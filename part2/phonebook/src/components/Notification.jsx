const Notification = ({ message, style }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    borderRadius: 5,
    borderStyle: 'solid',
    fontSize: 20,
    marginBottom: 10,
    padding: 10,
    ...style
  }
  // console.log(errorStyle)

  if (message === null)
    return null

  return (
    <div style={errorStyle}>
      {message}
    </div>
  )
}

export default Notification