import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Editor from "./pages/Editor";
import Viewer from "./pages/Viewer";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import ManageUsers from "./pages/ManageUsers";
import Reports from "./pages/Reports";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Create Post - Admin + Editor */}
        <Route
          path="/create-post"
          element={
            <ProtectedRoute role={["admin", "editor"]}>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        {/* Edit Post - Admin + Editor */}
        <Route
          path="/edit-post/:id"
          element={
            <ProtectedRoute role={["admin", "editor"]}>
              <EditPost />
            </ProtectedRoute>
          }
        />

        {/* Manage Users - Admin Only */}
        <Route
          path="/manage-users"
          element={
            <ProtectedRoute role="admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        {/* Reports - Admin Only */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute role="admin">
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Editor Dashboard */}
        <Route
          path="/editor"
          element={
            <ProtectedRoute role="editor">
              <Editor />
            </ProtectedRoute>
          }
        />

        {/* Viewer Dashboard */}
        <Route
          path="/viewer"
          element={
            <ProtectedRoute role="viewer">
              <Viewer />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;