import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }
  
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }
  
  const handleBadClick = () => {
    const updatedBadClick = bad + 1
    setBad(updatedBadClick)
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
    </div>
  )
}

export default App
