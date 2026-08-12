import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts =
      JSON.parse(localStorage.getItem("posts")) || [];

    setPosts(savedPosts);
  }, []);

  const deletePost = (id) => {
    const updatedPosts = posts.filter(
      (post) => post.id !== id
    );

    localStorage.setItem(
      "posts",
      JSON.stringify(updatedPosts)
    );

    setPosts(updatedPosts);

    alert("Post deleted successfully!");
  };

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Admin Dashboard</h1>

      <hr />

      <h2>Welcome Admin 👋</h2>

      <br />

      <button
        onClick={() => navigate("/manage-users")}
      >
        Manage Users
      </button>

      <br />
      <br />

      <button
        onClick={() => {
          if (posts.length === 0) {
            alert("No posts available to delete.");
          } else {
            alert(
              "Delete posts using the Delete button below."
            );
          }
        }}
      >
        Delete Posts
      </button>

      <br />
      <br />

      <button
        onClick={() => navigate("/create-post")}
      >
        Create New Post
      </button>

      <br />
      <br />

      <button>
        View Reports
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

            <br />

            <button
              onClick={() =>
                navigate(`/edit-post/${post.id}`)
              }
              style={{
                marginRight: "10px",
                padding: "8px 15px"
              }}
            >
              Edit
            </button>

            <button
              onClick={() => deletePost(post.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "8px 15px",
                border: "none",
                cursor: "pointer"
              }}
            >
              Delete
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default Admin;