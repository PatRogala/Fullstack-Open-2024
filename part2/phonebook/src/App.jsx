import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import numbersService from './services/numbers'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    numbersService.getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
        numbersService.update(persons.find(person => person.name === newName).id, { ...persons.find(person => person.name === newName), number: newNumber })
        setPersons(persons.map(person => person.name === newName ? { ...person, number: newNumber } : person))
        setErrorMessage(`Updated ${newName}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      }
      return
    }

    const newPerson = { name: newName, number: newNumber }

    numbersService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setErrorMessage(`Added ${newName}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      })
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete?')) {
      numbersService.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setErrorMessage(`error: Information of ${persons.find(person => person.id === id).name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} setPersons={setPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App