import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (

    <div
      style={{
        backgroundColor: "#333",
        color: "white",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >

      <h2>RoleAuth</h2>

      <div>

        <Link
          to="/"
          style={{ color: "white", marginRight: "20px" }}
        >
          Home
        </Link>

        {role === "admin" && (
          <Link
            to="/admin"
            style={{ color: "white", marginRight: "20px" }}
          >
            Admin
          </Link>
        )}

        {role === "editor" && (
          <Link
            to="/editor"
            style={{ color: "white", marginRight: "20px" }}
          >
            Editor
          </Link>
        )}

        {role === "viewer" && (
          <Link
            to="/viewer"
            style={{ color: "white", marginRight: "20px" }}
          >
            Viewer
          </Link>
        )}

        <button onClick={logout}>
          Logout
        </button>

      </div>

    </div>

  );

}

export default Navbar;