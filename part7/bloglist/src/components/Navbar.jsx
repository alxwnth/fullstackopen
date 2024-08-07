import { Link, Route, Routes } from "react-router-dom";
import { Greeting } from "./Greeting";

export const Navbar = () => {
  return (
    <div>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <Greeting />
    </div>
  );
};
