const Header = (props) => <h1>{props.course}</h1>


const Part = ({ name, exercises }) => <div>{name} {exercises}</div>


const Content = ({ parts }) =>
  <>{parts.map(({ name, exercises }) => <Part name={name} exercises={exercises} />)}</>


const Total = ({ parts }) => {
  const exercise_count = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p>Number of exercises {exercise_count}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
