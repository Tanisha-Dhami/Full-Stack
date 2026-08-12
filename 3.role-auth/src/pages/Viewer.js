import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Viewer() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts =
      JSON.parse(localStorage.getItem("posts")) || [];

    setPosts(savedPosts);
  }, []);

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Viewer Dashboard</h1>

      <hr />

      <h2>Welcome Viewer 👋</h2>

      <button
        onClick={logout}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px 20px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

      <hr />

      <h1>All Posts</h1>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: "30px",
              marginBottom: "20px",
              width: "600px"
            }}
          >
            <h2>{post.title}</h2>

            <p>{post.content}</p>
          </div>
        ))
      )}

    </div>
  );
}

export default Viewer;