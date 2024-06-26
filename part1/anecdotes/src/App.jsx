import { useState } from "react";
import Anecdote from "./components/Anectode";
import Rating from "./components/Rating";
import TopAnecdote from "./components/TopAnecdote";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [ratings, setRatings] = useState(new Uint8Array(anecdotes.length));
  const [topAnecdoteIndex, setTopAnecdoteIndex] = useState(-1);

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };
  const handleVote = () => {
    const ratingsCopy = [...ratings];
    ratingsCopy[selected] += 1;
    setRatings(ratingsCopy);
    setTopAnecdoteIndex(
      ratingsCopy.reduce(
        (maxIndex, n, i, arr) => (n > arr[maxIndex] ? i : maxIndex),
        0
      )
    );
  };

  return (
    <>
      <h2>Anecdote of the day</h2>
      <Anecdote text={anecdotes[selected]} />
      <Rating rating={ratings[selected]} />
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
      <TopAnecdote
        anecdote={anecdotes[topAnecdoteIndex]}
        rating={ratings[topAnecdoteIndex]}
      />
    </>
  );
};

export default App;
