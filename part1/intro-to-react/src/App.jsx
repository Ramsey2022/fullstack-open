import { useState } from "react"

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age 

  return (
    <div>
      <p>Hello {name}, you are {age} years old </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing buttons
      </div>
    )
  }
  return (
    <div>
      button press History: {props.allClicks.join('')}
    </div>
  )
}

const Greet = (who) => () => {
    console.log('hello', who)
  }

const App = () => {
  const name = 'Peter'
  const age = 10
  const [ counter, setCounter ] = useState(0)

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const [value, setValue] = useState(10)

  const handleClick = () => {
    console.log('clicked the button')
    setValue(0)
  }

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  {/* Separated left+1 for immutability */}

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }

  const increaseByOne = () => {
    setCounter(counter + 1)
  }
  const decreaseByOne = () => {
    setCounter(counter - 1)
  }
  const setToZero = () => {
    setCounter(0)
  }

  const setToValue = (newValue) => () => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='George' age ={26+10} />
      <Hello name={name} age={age} />
      <Display counter={counter} />
      <Button
        handleClick={increaseByOne}
        text='plus'
      />
      <Button
        handleClick={decreaseByOne}
        text='minus'
      />
      <Button
        handleClick={setToZero}
        text='zero'
      />

      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks} />
      <p>total: {total}</p>

      {value}
      <button onClick={handleClick}>button</button>

      <button onClick={Greet('world')}>world</button>
      <button onClick={Greet('react')}>react</button>
      <button onClick={Greet('function')}>function</button>

{/* function within a function */}

      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>

    </div>
  )
}

export default App
