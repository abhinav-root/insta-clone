import axios from "axios";
import React, { useState } from "react";

const CreateNewPost = ({ posts, setPosts }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");

  const uploadPost = () => {
    if (file && title) {
      const user = JSON.parse(localStorage.getItem("user"));
      const id = user.user_id;
      const name = user.user_name;
      const data = new FormData();
      data.append("id", id);
      data.append("name", name);
      data.append("title", title);
      const imgSrc = id + "--" + Date.now() + "--";
      data.append("image", file, imgSrc);
      const newPost = {
        author: name,
        postTitle: title,
        postImgSrc: imgSrc,
      };
      setPosts([newPost, ...posts]);
      axios
        .post("http://localhost:5000/post", data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    setTitle("");
    setFile("");
  };

  return (
    <div className="bg-white flex flex-col shadow-md rounded-md mt-8 px-8 py-4 max-w-lg mx-auto">
      <div className="text-blue-700 text-2xl text-center font-semibold">
        Create a new post
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="font-medium uppercase  text-blue-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="w-full px-2 py-1 bg-white outline-none ring-1 ring-gray-400 focus:ring-2 focus:ring-blue-700 rounded-sm mr-1 mt-1"
        />
      </div>
      <div className="mb-4 mt-6">
        <label
          htmlFor="file"
          className="font-medium text-blue-700 hover:text-blue-500 uppercase cursor-pointer"
        >
          Choose a photo
        </label>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          name="image"
          id="file"
          className="hidden"
        />
      </div>
      <button
        onClick={uploadPost}
        className=" tracking-wide px-3 py-2 uppercase bg-blue-700 hover:bg-blue-500 text-white font-semibold rounded-md"
      >
        Post
      </button>
    </div>
  );
};

export default CreateNewPost;
