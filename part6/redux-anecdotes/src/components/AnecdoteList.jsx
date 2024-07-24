import { useSelector, useDispatch } from "react-redux";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter((a) => a.content.match(new RegExp(filter, "gi")));
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch({ type: "anecdotes/voteAnecdote", payload: id });
    dispatch({
      type: "notification/setNotification",
      payload: `you voted '${anecdotes.find((a) => a.id === id).content}'`,
    });
    setTimeout(() => {
      dispatch({
        type: "notification/setNotification",
        payload: "",
      });
    }, 5000);
  };
  return [...anecdotes]
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    ));
};

export default AnecdoteList;
