import Course from './components/Course'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      id: 1,
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      id: 2,
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      id: 3,
      name: 'State of a component',
      exercises: 14
    },
    {
      id: 4,
      name: 'Redux',
      exercises: 11
    }
  ]

  return (
    <>
      <Course name={course} parts={parts} />
    </>
  )
}

export default App
