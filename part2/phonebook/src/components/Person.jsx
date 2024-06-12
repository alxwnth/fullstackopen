const Person = ({ person, deleteHandler }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => deleteHandler(person)}>delete</button>
    </li>
  );
};

export default Person;
