import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard.tsx";
import Login from "../components/auth/Login.tsx";
import Register from "../components/register/Register.tsx";
import NotesData from "../components/NotesData/NotesData.tsx";
import CreateNote from "../components/CreateNote/CreateNote.tsx";
import EditNote from "../components/EditNote/EditNote.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import Profile from "../components/Profile/Profile.tsx";
import ShowTextEditor from "../components/ShowTextEditor/index.tsx";
import TextEditor from "../components/TextEditor/index.tsx";
import EditTextEditor from "../components/EditTextEditor/index.tsx";
import MarkdownEditor from "../components/MarkdownEditor";
import MarkdownFile from "../components/ShowMarkdownFile";
import EditMarkdownEditor from "../components/EditMarkdownEditor/index.tsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/notes"
          element={
            <PrivateRoute>
              <NotesData />
            </PrivateRoute>
          }
        />
        <Route
          path="/paragraphix"
          element={
            <PrivateRoute>
              <ShowTextEditor />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-paragraphix"
          element={
            <PrivateRoute>
              <TextEditor />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-paragraphix/:id"
          element={
            <PrivateRoute>
              <EditTextEditor />
            </PrivateRoute>
          }
        />
        <Route
          path="/markdown-editor"
          element={
            <PrivateRoute>
              <MarkdownEditor />
            </PrivateRoute>
          }
        />
        <Route
          path="/get-markdown-file"
          element={
            <PrivateRoute>
              <MarkdownFile />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-markdown-editor/:id"
          element={
            <PrivateRoute>
              <EditMarkdownEditor />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-note"
          element={
            <PrivateRoute>
              <CreateNote />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-note/:id"
          element={
            <PrivateRoute>
              <EditNote />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
