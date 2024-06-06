const RatingButtons = ({ handleActions }) => {
  return (
    <>
      <h2>give feedback</h2>
      <button onClick={handleActions[0]}>good</button>
      <button onClick={handleActions[1]}>neutral</button>
      <button onClick={handleActions[2]}>bad</button>
    </>
  );
};

export default RatingButtons;
