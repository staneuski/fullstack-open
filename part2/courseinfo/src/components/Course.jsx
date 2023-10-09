import Content from './Content'
import Total from './Total'

const Course = ({ name, parts }) =>
  <>
    <h2>{name}</h2>
    <Content parts={parts} />
    <Total parts={parts} />
  </>

export default Course
