import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../NotificationContext";
import { updateAnecdote } from "../requests";

const Anecdote = ({ anecdote }) => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((anecdote) =>
          anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
        )
      );
      dispatch({
        type: "SET",
        payload: `you have voted ${updatedAnecdote.content}`,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR" });
      }, 5000);
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </>
  );
};

export default Anecdote;
