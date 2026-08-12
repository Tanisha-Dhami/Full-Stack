import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Editor() {
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

      <h1>Editor Dashboard</h1>

      <hr />

      <h3>Welcome Editor 👋</h3>

      <br />

      <button onClick={() => navigate("/create-post")}>
        Create New Post
      </button>

      <br />
      <br />

      <button>
        Upload Images
      </button>

      <br />
      <br />

      <button>
        Manage Comments
      </button>

      <br />
      <br />

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

      <h2>All Posts</h2>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              marginBottom: "15px",
              width: "500px"
            }}
          >
            <h2>{post.title}</h2>

            <p>{post.content}</p>

            <button
              onClick={() =>
                navigate(`/edit-post/${post.id}`)
              }
            >
              Edit
            </button>
          </div>
        ))
      )}

    </div>
  );
}

export default Editor;