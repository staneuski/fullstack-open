import { useState } from 'react'


const Header = ({ content }) => <h1>{content}</h1>


const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>{text}</button>


const Stat = ({ text, value }) => <p>{text} {value}</p>


const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad

  return (
    <>
      <Header content='statistics' />
      <Stat text='good' value={good} />
      <Stat text='neutral' value={neutral} />
      <Stat text='bad' value={bad} />
      <Stat text='all' value={all} />
      <Stat text='average' value={(good - bad) / all} />
      <Stat text='positive' value={(good / all * 100) + ' %'} />
    </>
  )
}


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

      <Statistics header='statistics' good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
