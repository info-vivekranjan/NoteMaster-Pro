import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/auth/Login";
import Register from "../components/register/Register";
import NotesData from "../components/NotesData/NotesData";
import CreateNote from "../components/CreateNote/CreateNote";
import EditNote from "../components/EditNote/EditNote";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<NotesData />} />
        <Route path="/create-note" element={<CreateNote />} />
        <Route path="/edit-note/:id" element={<EditNote />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
