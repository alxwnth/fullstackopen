import { createSlice } from "@reduxjs/toolkit";

import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push({
        content: action.payload,
        id: getId(),
        votes: 0,
      });
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      console.log(action);
      const anecdoteToUpvote = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteToUpvote,
        votes: anecdoteToUpvote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(_, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, appendAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({ type: "anecdotes/setAnecdotes", payload: anecdotes });
  };
};

export default anecdoteSlice.reducer;
