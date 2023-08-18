import { useState } from 'react'


const Header = ({ content }) => <h1>{content}</h1>


const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>{text}</button>


const StatisticsLine = ({ text, value }) => <p>{text} {value}</p>


const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all === 0) {
    return (
      <div>
        <Header content='statistics' />
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <Header content='statistics' />
      <StatisticsLine text='good' value={good} />
      <StatisticsLine text='neutral' value={neutral} />
      <StatisticsLine text='bad' value={bad} />
      <StatisticsLine text='all' value={all} />
      <StatisticsLine text='average' value={(good - bad) / all} />
      <StatisticsLine text='positive' value={(good / all * 100) + ' %'} />
    </div>
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
