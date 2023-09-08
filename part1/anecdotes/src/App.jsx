import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const AnecdoteOfTheDay = (props) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdote}</p>
      <p>Has {props.vote} votes</p>
    </>
  )
}

const AnecdoteWithMostVotes = ({ topAnecdote, topVote }) => {
  return (
    <>
      <h1>Anecdote with the most votes</h1>
      {topVote ? (
        <>
        <p>{topAnecdote}</p>
        <p>Has {topVote} votes</p>
        </>
      ) : (
        <p>No votes yet</p>
      )}
    </>
  )
}

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
  const generateRandom = (length) => Math.floor(Math.random() * length)
  const topVote = Math.max(...points)
  const topAnecdote = anecdotes[points.indexOf(topVote)]

  const handleSelect = () => {
    let random = generateRandom(anecdotes.length)
    while(random === selected) {
      random = generateRandom(anecdotes.length)
    }
    setSelected(random)
  }

  const handleVote = () => {
    const updatedPoints = [...points]
    updatedPoints[selected] += 1
    setPoints(updatedPoints)
  }




  return (
    <div>
      <AnecdoteOfTheDay
        anecdote={anecdotes[selected]}
        vote={points[selected]}
      />
      <br /> 
      <Button
        handleClick={handleSelect}
        text='Next Anecdote'
      />
      <Button
        handleClick={handleVote}
        text='Vote'
      />
      <AnecdoteWithMostVotes topAnecdote={topAnecdote} topVote={topVote} />
    </div>
  )
}

export default App
