import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )

const Statistics = (props) => {
  return (
    <div>
      <h1>Statistics</h1>
      <br />

      { !props.all ? (
        <h2>No Feedback Yet</h2>
       ) : (
      <table>
        <tbody>
          <StatisticLine text='Good: ' value={props.good}/>
          <StatisticLine text='Neutral: ' value={props.neutral}/>
          <StatisticLine text='Bad: ' value={props.bad}/>
          <StatisticLine text='All: ' value={props.all}/>
          <StatisticLine text='Average ' value={props.average}/>
          <StatisticLine text='Positive ' value={props.positive}/>
          <StatisticLine text='Negative ' value={props.negative}/>
        </tbody>
      </table>
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
  const positive = ((good * 100) / all) + '%'
  const negative = ((bad * 100) / all) + '%'

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
