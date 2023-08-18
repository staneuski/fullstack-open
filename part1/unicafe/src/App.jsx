import { useState } from 'react'


const Header = ({ content }) => <h1>{content}</h1>


const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>{text}</button>


const Statistics = ({ text, count }) => <p>{text} {count}</p>


function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header content='give feedback' />
      <Button handleClick={() => setGood(good => good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral => neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad => bad + 1)} text='bad' />

      <Header content='statistics' />
      <Statistics text='good' count={good} />
      <Statistics text='neutral' count={neutral} />
      <Statistics text='bad' count={bad} />
    </>
  )
}

export default App
