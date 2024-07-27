import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdote } from "./requests";
import { NotificationContextProvider } from "./NotificationContext";
import Anecdote from "./components/Anecdote";

const App = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
  });

  if (isLoading) {
    return <div>loading anecdotes...</div>;
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = data;

  return (
    <NotificationContextProvider>
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />

        {anecdotes.map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        ))}
      </div>
    </NotificationContextProvider>
  );
};

export default App;
