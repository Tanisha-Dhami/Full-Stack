import { useState } from "react";

function PostComposer() {
  const [post, setPost] = useState("");
  const [platforms, setPlatforms] = useState([]);

  const limits = {
    Twitter: 280,
    LinkedIn: 3000,
    Instagram: 2200,
    Facebook: 63206,
  };

  const handlePlatform = (platform) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter((p) => p !== platform));
    } else {
      setPlatforms([...platforms, platform]);
    }
  };

  return (
    <div className="container">

      <h1>Dynamic Post Composer</h1>

      <p className="subtitle">
        Compose once. Publish everywhere.
      </p>

      <hr />

      <h2>Select Platforms</h2>

      <div className="platforms">

        <label>
          <input
            type="checkbox"
            checked={platforms.includes("Twitter")}
            onChange={() => handlePlatform("Twitter")}
          />
          Twitter
        </label>

        <label>
          <input
            type="checkbox"
            checked={platforms.includes("LinkedIn")}
            onChange={() => handlePlatform("LinkedIn")}
          />
          LinkedIn
        </label>

        <label>
          <input
            type="checkbox"
            checked={platforms.includes("Instagram")}
            onChange={() => handlePlatform("Instagram")}
          />
          Instagram
        </label>

        <label>
          <input
            type="checkbox"
            checked={platforms.includes("Facebook")}
            onChange={() => handlePlatform("Facebook")}
          />
          Facebook
        </label>

      </div>

      <hr />

      <h2>Write Your Post</h2>

      <textarea
        placeholder="Write your post..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>

      <p className="counter">
        {post.length} Characters
      </p>

      <hr />

      <h2>Character Count by Platform</h2>

      <div className="result">

        {platforms.length === 0 ? (
          <p>Please select at least one platform.</p>
        ) : (
          platforms.map((platform) => (
            <div className="card" key={platform}>

              <h3>{platform}</h3>

              <h2>
                {post.length} / {limits[platform]}
              </h2>

              {post.length <= limits[platform] ? (
                <p className="ok">✅ OK</p>
              ) : (
                <p className="error">
                  ❌ Character Limit Exceeded
                </p>
              )}

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default PostComposer;