import { createSlice } from "@reduxjs/toolkit";

import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    // voteAnecdote(state, action) {
    //   const id = action.payload;
    //   const anecdoteToUpvote = state.find((n) => n.id === id);
    //   const changedAnecdote = {
    //     ...anecdoteToUpvote,
    //     votes: anecdoteToUpvote.votes + 1,
    //   };
    //   return state.map((anecdote) =>
    //     anecdote.id !== id ? anecdote : changedAnecdote
    //   );
    // },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(_, action) {
      return action.payload;
    },
    replaceAnecdote(state, action) {
      return state.map((anecdote) =>
        anecdote.id !== action.payload.id ? anecdote : action.payload
      );
    },
  },
});

export const { appendAnecdote, setAnecdotes, replaceAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({ type: "anecdotes/setAnecdotes", payload: anecdotes });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.upvoteAnecdote(id);
    dispatch(replaceAnecdote(newAnecdote));
  };
};

export default anecdoteSlice.reducer;
