import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  
  const average = (good - bad) / all
  const positive = (good * 100) / all
  const negative = (bad * 100) / all

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(updatedGood + neutral + bad)
  }
  
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(good + updatedNeutral + bad)
  }
  
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(good + neutral + updatedBad)
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
      <h1>Statistics</h1>
      <br />
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive}</p>
      <p>Negative: {negative}</p>
    </div>
  )
}

export default App
