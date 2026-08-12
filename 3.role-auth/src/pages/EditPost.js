import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  const post = posts.find(
    (post) => post.id === Number(id)
  );

  const [title, setTitle] = useState(
    post ? post.title : ""
  );

  const [content, setContent] = useState(
    post ? post.content : ""
  );

  const updatePost = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    const updatedPosts = posts.map((post) =>
      post.id === Number(id)
        ? {
            ...post,
            title: title,
            content: content
          }
        : post
    );

    localStorage.setItem(
      "posts",
      JSON.stringify(updatedPosts)
    );

    alert("Post updated successfully!");

    navigate("/admin");
  };

  if (!post) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Post not found</h1>

        <button onClick={() => navigate("/admin")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>

      <h1>Edit Post</h1>

      <form onSubmit={updatePost}>

        <label>Post Title</label>

        <br />

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "400px",
            padding: "10px"
          }}
        />

        <br />
        <br />

        <label>Post Content</label>

        <br />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="8"
          style={{
            width: "400px",
            padding: "10px"
          }}
        />

        <br />
        <br />

        <button type="submit">
          Update Post
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin")}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>

      </form>

    </div>
  );
}

export default EditPost;