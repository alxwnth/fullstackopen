import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const upvoteAnecdote = async (id) => {
  const foundAnecdote = (await axios.get(`${baseUrl}/${id}`)).data;
  const response = await axios.put(`${baseUrl}/${id}`, {
    ...foundAnecdote,
    votes: foundAnecdote.votes + 1,
  });
  return response.data;
};

export default { getAll, createNew, upvoteAnecdote };
