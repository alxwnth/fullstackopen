import Person from "./Person";

const Persons = ({ persons, deleteHandler }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person
          key={person.name}
          person={person}
          deleteHandler={deleteHandler}
        />
      ))}
    </ul>
  );
};

export default Persons;
