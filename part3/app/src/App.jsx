import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import personService from "./services/persons";
import NotificationBox from "./components/NotificationBox";
import "./style.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameToFilter, setNameToFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const foundPerson = persons.find((person) => person.name === newName);
    if (foundPerson) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        personService
          .replaceRecord(foundPerson.id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== foundPerson.id ? person : returnedPerson
              )
            );
          });
      }
    } else {
      personService.create(personObject).then((person) => {
        setPersons(persons.concat(person));
      });
    }
    setNewName("");
    setNewNumber("");
    displayNotification(`Added ${newName}`);
  };

  const displayNotification = (text, isError = false) => {
    setMessage({
      text: text,
      isError: isError,
    });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleDelete = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      personService
        .deleteRecord(person.id)
        .then(() => displayNotification(`Deleted ${person.name}`))
        .catch(() =>
          displayNotification(
            `Information of ${person.name} has already been removed from server`,
            true
          )
        );
      setPersons(persons.filter((p) => p.id !== person.id));
    }
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
      <NotificationBox message={message} />
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
        deleteHandler={handleDelete}
      />
    </div>
  );
};

export default App;
