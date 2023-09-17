import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import peopleService from './services/people'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  })
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setPersonsToShow(response.data)
      })
  }

  useEffect(hook, [])
  console.log('render', persons.length, 'people')

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

    peopleService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(newPerson))
        setPersonsToShow(personsToShow.concat(newPerson))
        setNewPerson({ name: '', number: '' })
      })
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
