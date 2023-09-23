import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import peopleService from './services/people'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  })
  const [filter, setFilter] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])
  const [message, setMessage] = useState(null)

  const addPerson = (e) =>{
    e.preventDefault()

    const existingPerson = persons.filter(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    )

    if (existingPerson.length === 0) {
      peopleService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setPersonsToShow(personsToShow.concat(returnedPerson))
        setMessage(`Added ${newPerson.name}`)
      })
    } else {
      if(window.confirm(`${newPerson.name} is already in Phonebook. Replace the old number with a new one?`)) {
        peopleService
          .update(existingPerson[0].id, newPerson)
          .then(returnedPerson => {
            const updatePeople = persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson)
            setPersons(updatePeople)
            setPersonsToShow(updatePeople)
            setMessage(`Updated ${newPerson.name}`)
          })
      }
    }
    setNewPerson({ name: '', number: '' })
  }

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
        setPersonsToShow(initialPeople)
      })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }, [message])

  const removePerson = (id, name) => {
    if(window.confirm(`Delete ${name} from Phonebook?`)) {
      peopleService
        .remove(id)
        .then(returnedPerson => {
          const updatePeople = persons.filter(p => p.id !== id)
          setPersons(updatePeople)
          setPersonsToShow(updatePeople)
        })
    }
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
      <Notification message={message} />
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
        personsToShow={personsToShow}
        removePerson={removePerson} />
    </div>
  )
}

export default App
