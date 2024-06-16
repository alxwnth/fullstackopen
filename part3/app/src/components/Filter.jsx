const Filter = ({ nameToFilter, filterHandler }) => {
  return (
    <>
      filter shown with: <input value={nameToFilter} onChange={filterHandler} />
    </>
  );
};

export default Filter;
