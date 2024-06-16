const PersonForm = ({
  addPersonHandler,
  newNameValue,
  nameChangeHandler,
  newNumberValue,
  numberChangeHandler,
}) => {
  return (
    <form onSubmit={addPersonHandler}>
      <div>
        name: <input value={newNameValue} onChange={nameChangeHandler} />
        number: <input value={newNumberValue} onChange={numberChangeHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
