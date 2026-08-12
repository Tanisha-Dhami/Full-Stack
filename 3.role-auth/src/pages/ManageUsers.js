import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin User",
      role: "admin"
    },
    {
      id: 2,
      name: "Editor User",
      role: "editor"
    },
    {
      id: 3,
      name: "Viewer User",
      role: "viewer"
    }
  ]);

  const deleteUser = (id) => {
    const updatedUsers = users.filter(
      (user) => user.id !== id
    );

    setUsers(updatedUsers);

    alert("User deleted successfully!");
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Manage Users</h1>

      <hr />

      <h2>All Users</h2>

      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            marginBottom: "15px",
            width: "500px"
          }}
        >

          <h3>{user.name}</h3>

          <p>
            Role: <strong>{user.role}</strong>
          </p>

          <button
            onClick={() => deleteUser(user.id)}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "8px 15px",
              border: "none"
            }}
          >
            Delete User
          </button>

        </div>
      ))}

      <br />

      <button onClick={() => navigate("/admin")}>
        Back to Dashboard
      </button>

    </div>
  );
}

export default ManageUsers;