import { useState } from 'react'


const Header = ({ content }) => <h1>{content}</h1>


const Button = ({ handleClick, text }) =>
  <button onClick={handleClick}>{text}</button>


const Anecdote = ({ title, content, votes }) =>
  <><Header content={title}/><div>{content}</div><div>has {votes} vote(s)</div></>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [maxPoints, setMaxPoints] = useState(0)

  const getRandPos = () => {
    const pos = Math.floor(Math.random() * anecdotes.length)
    console.log('getRandPos', pos, anecdotes[pos])
    return pos
  }

  const handleVoteClick = () => {
    const updatedPoints = [ ...points ]
    updatedPoints[selected]++
    setPoints(updatedPoints)
    setMaxPoints(Math.max(...updatedPoints))
  }

  return (
    <>
      <Anecdote title='Anecdote of the day'
                content={anecdotes[selected]}
                votes={points[selected]} />
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={() => setSelected(() => getRandPos())} text='next anecdote' />
      <Anecdote title='Anecdote with most votes'
                content={anecdotes[points.indexOf(maxPoints)]}
                votes={maxPoints}/>
    </>
  )
}

export default App
