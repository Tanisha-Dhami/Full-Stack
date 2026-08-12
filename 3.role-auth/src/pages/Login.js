import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const login = (role) => {
    localStorage.setItem("role", role);

    if (role === "admin") {
      navigate("/admin");
    } else if (role === "editor") {
      navigate("/editor");
    } else {
      navigate("/viewer");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Role Based Authentication</h1>

      <button onClick={() => login("admin")}>
        Login as Admin
      </button>

      <br /><br />

      <button onClick={() => login("editor")}>
        Login as Editor
      </button>

      <br /><br />

      <button onClick={() => login("viewer")}>
        Login as Viewer
      </button>

    </div>
  );
}

export default Login;