import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data.sort((a, b) => b.likes - a.likes);
};

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (id, changedBlog) => {
  const config = { headers: { Authorization: token } };

  const response = await axios.put(`${baseUrl}/${id}`, changedBlog, config);
  return response.data;
};

export default { getAll, setToken, create, update };
