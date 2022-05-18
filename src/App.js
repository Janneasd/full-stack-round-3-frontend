import React from "react";
import { useState, useEffect  } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/PersonService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  

 

  useEffect(() => {
    personService
    .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])
  const addPerson = (event) => {
    event.preventDefault()
    
    if(persons.filter(person => person.content === newName).length <= 0) {
      const personObject = {
        content: newName,
        number: newNumber,
        id: persons.length + 1,
      }
    personService
    .create(personObject)
    .then(returnedPerson =>  {
    setPersons(persons.concat(returnedPerson))
    setNewName('')
    })
    } else {
alert(`${newName} is already in the phonebook do you want to change number?`)
    const oldPerson = persons.find(oldPerson => oldPerson.content === newName)
    const changedPerson = {...oldPerson, number: newNumber}
    console.log(oldPerson)
    console.log(changedPerson)
    personService
    .update(oldPerson.id, changedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(person => person.content !== oldPerson.content ? person : returnedPerson))
      setNewName('')
      setNewNumber("");
    })
    
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }
/*
  const handleRemovePerson = (id) => {
  personService
  .destroy(id)
  .then(() => {
    
    setPersons(persons.filter(id => id.id !== id))
    setNewName("")
    setNewNumber("")
  })
  }
*/

  const handleRemovePerson = (name, id) => {
    return () => {
      if (window.confirm(`Want to delete ${name} ?`)) {
        personService
          .destroy(id)
          .then(() => {
            setPersons(persons.filter(personId => personId.id !== id));
            setNewName("");
            setNewNumber("");
          })
        setTimeout(() => {
        }, 5000);
      }
    };
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
      filter={newSearch}
      handleSearchChange={handleSearchChange}
      />
      <h3>Add a new</h3>
       <PersonForm 
       newName={newName}
       newNumber={newNumber}
       onChangeName={handleNameChange}
       onChangeNumber={handleNumberChange}
       addPerson={addPerson}
        />
      <h3>Numbers</h3>
      <Persons 
      persons={persons}
      filter={newSearch}
      handleRemovePerson={handleRemovePerson}
      />
    </div>
  )

}

export default App