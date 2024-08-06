import { useEffect, useState } from "react";
import usersService from "../services/users";

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    usersService.getAll().then((users) => {
      setUsers(users);
    });
  }, []);
  return (
    <table>
      <tr>
        <th></th>
        <th>blogs created</th>
      </tr>
      {users.map((user) => (
        <tr key={user.username}>
          <td>{user.username}</td>
          <td>{user.blogs.length}</td>
        </tr>
      ))}
    </table>
  );
};
