import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Reports() {
  const navigate = useNavigate();

  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const posts =
      JSON.parse(localStorage.getItem("posts")) || [];

    setTotalPosts(posts.length);
  }, []);

  return (
    <div style={{ padding: "30px" }}>

      <h1>Reports</h1>

      <hr />

      <h2>Project Statistics</h2>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          width: "300px",
          marginBottom: "20px"
        }}
      >
        <h3>Total Posts</h3>
        <p>{totalPosts}</p>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          width: "300px"
        }}
      >
        <h3>Application</h3>
        <p>Role Based Content Management System</p>
      </div>

      <br />

      <button onClick={() => navigate("/admin")}>
        Back to Dashboard
      </button>

    </div>
  );
}

export default Reports;