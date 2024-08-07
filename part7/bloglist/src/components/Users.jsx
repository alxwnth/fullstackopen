import { useEffect, useState } from "react";
import usersService from "../services/users";
import { User } from "./User";
import { Link, Route, Routes, useMatch } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const match = useMatch("/users/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  useEffect(() => {
    usersService.getAll().then((users) => {
      setUsers(users);
    });
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>blogs created</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.username}>
                    <td>
                      <Link to={`/users/${user.id}`}>{user.username}</Link>
                    </td>
                    <td>{user.blogs.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        />
        <Route path=":id" element={<User user={user} />} />
      </Routes>
    </>
  );
};
