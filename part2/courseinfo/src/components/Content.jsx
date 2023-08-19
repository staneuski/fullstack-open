import Part from './Part'

const Content = ({ parts }) => {
  // const exercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <>
      {parts.map(({ id, name, exercises }) =>
        <Part key={id} name={name} exercises={exercises} />)}
      {/* <Part name='Number of exercises' exercises={exercises} /> */}
    </>
  )
}

export default Content
