import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)

  const addPerson = (e) =>{
    e.preventDefault()

    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }

    const personObject = { name: newName, number: newNumber }
    setPersons(persons.concat(personObject))
    setPersonsToShow(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handlePersonChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    const results = e.target.value
    setFilter(results)
    setPersonsToShow(
      persons.filter(person => person.name.toLowerCase().includes(results.toLowerCase()))
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <p>
          Looking for someone?
          <input
            value={filter}
            onChange={handleFilterChange}
          />
      </p>

      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          Name:  
          <input
          value={newName}
          onChange={handlePersonChange}
          />
        </div>
        <div>
          Number:
          <input
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person => (
          <Person key={person.id} person={person} />
        ))}
      </div>
    </div>
  )
}

export default App
