import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameToFilter, setNameToFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(personObject));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterNameChange = (event) => {
    setNameToFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        nameFilter={nameToFilter}
        filterHandler={handleFilterNameChange}
      />
      <h2>add a new</h2>
      <PersonForm
        addPersonHandler={addPerson}
        newNameValue={newName}
        nameChangeHandler={handleNameChange}
        newNumberValue={newNumber}
        numberChangeHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons.filter((person) =>
          person.name.match(new RegExp(nameToFilter, "gi"))
        )}
      />
    </div>
  );
};

export default App;
