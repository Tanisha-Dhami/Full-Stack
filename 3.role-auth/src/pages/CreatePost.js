import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    const oldPosts = JSON.parse(localStorage.getItem("posts")) || [];

    const newPost = {
      id: Date.now(),
      title: title,
      content: content,
    };

    localStorage.setItem(
      "posts",
      JSON.stringify([...oldPosts, newPost])
    );

    alert("Post created successfully!");

    navigate("/admin");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Create New Post</h1>

      <form onSubmit={createPost}>

        <div>
          <label>Post Title</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            style={{
              width: "400px",
              padding: "10px",
              marginTop: "8px"
            }}
          />
        </div>

        <br />

        <div>
          <label>Post Content</label>
          <br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post..."
            rows="8"
            style={{
              width: "400px",
              padding: "10px",
              marginTop: "8px"
            }}
          />
        </div>

        <br />

        <button type="submit">
          Publish Post
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

export default CreatePost;