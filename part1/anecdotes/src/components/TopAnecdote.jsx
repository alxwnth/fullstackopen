const TopAnecdote = ({ anecdote, rating }) => {
  if (anecdote) {
    return (
      <>
        <h2>Anecdote with most votes</h2>
        <p>{anecdote}</p>
        <p>has {rating} votes</p>
      </>
    );
  }
};

export default TopAnecdote;
