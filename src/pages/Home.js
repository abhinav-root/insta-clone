import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateNewPost from "../components/CreateNewPost";
import Post from "../components/Post";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    const response = await axios.get("http://localhost:5000/post");
    const data = await response.data;
    setPosts(data.posts);
    // axios.post("http://localhost:5000/post//updateviews", { posts });
  }, [posts]);

  return (
    <div className="min-h-screen px-8">
      <CreateNewPost posts={posts} setPosts={setPosts} />
      {posts.map((post) => (
        <Post
          key={post._id}
          likes={post.likes}
          views={post.views}
          comments={post.comments}
          author={post.author}
          title={post.postTitle}
          src={post.postImageSrc}
          postId={post._id}
        />
      ))}
    </div>
  );
};

export default Home;
