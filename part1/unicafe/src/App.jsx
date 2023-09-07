import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistics = (props) => {
  return (
    <div>
      <h1>Statistics</h1>
      <br />

      { !props.all ? (
        <h2>No Feedback Yet</h2>
       ) : (
      <>
      <p>Good: {props.good}</p>
      <p>Neutral: {props.neutral}</p>
      <p>Bad: {props.bad}</p>
      <p>All: {props.all}</p>
      <p>Average: {props.average}</p>
      <p>Positive: {props.positive}</p>
      <p>Negative: {props.negative}</p>
      </>
      )}
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const all = (good + neutral + bad)
  const average = (good - bad) / all
  const positive = (good * 100) / all
  const negative = (bad * 100) / all

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }
  
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }
  
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }


  return (
    <div>
      <h1>Give Feedback</h1>
      <Button 
      handleClick={handleGoodClick}
      text='Good'
      />
      <Button 
      handleClick={handleNeutralClick}
      text='Neutral'
      />
      <Button
      handleClick={handleBadClick}
      text='Bad'
      />
      <Statistics
      good={good}
      neutral={neutral}
      bad={bad}
      all={all}
      average={average}
      positive={positive}
      negative={negative}
      />
    </div>
  )
}

export default App
