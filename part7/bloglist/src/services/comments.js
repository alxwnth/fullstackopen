import axios from "axios";

const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (id, comment) => {
  console.log(id, comment);
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });

  return response.data;
};

export default { getAll, create };
