import { useEffect, useState } from "react";
import usersService from "../services/users";
import { User } from "./User";
import { Link, Route, Routes, useMatch } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>blogs created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.username}>
                    <TableCell>
                      <Link to={`/users/${user.id}`}>{user.username}</Link>
                    </TableCell>
                    <TableCell>{user.blogs.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          }
        />
        <Route path=":id" element={<User user={user} />} />
      </Routes>
    </>
  );
};
