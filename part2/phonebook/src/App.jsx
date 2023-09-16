import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  })
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons)

  const addPerson = (e) =>{
    e.preventDefault()

    if (
      persons.some(
        (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
      )
    ) {
      alert(`${newPerson.name} is already added to phonebook`)
      setNewPerson({ name: '', number: '' })
      return
    }
    setPersons(persons.concat(newPerson))
    setPersonsToShow(personsToShow.concat(newPerson))
    setNewPerson({ name: '', number: '' })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewPerson({ ...newPerson, [name]: value })
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
        <Filter 
        filter={filter} 
        handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
        <PersonForm 
        addPerson={addPerson} 
        newPerson={newPerson} 
        handleChange={handleChange} />
      <h2>Numbers</h2>
      <Persons 
        personsToShow={personsToShow} />
    </div>
  )
}

export default App
