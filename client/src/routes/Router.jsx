import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/auth/Login";
import Register from "../components/register/Register";
import NotesData from "../components/NotesData/NotesData";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<NotesData />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
