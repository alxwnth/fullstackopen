const Ratings = ({ good, neutral, bad }) => {
  return (
    <>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </>
  );
};

export default Ratings;
