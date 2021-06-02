import React, { useState } from "react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { HeartIcon as LikeIcon } from "@heroicons/react/outline";
import { HeartIcon as LikeIconRed } from "@heroicons/react/solid";
import { ChatAltIcon as CommentIcon } from "@heroicons/react/outline";
import { ShareIcon } from "@heroicons/react/outline";
import { BookmarkIcon as SaveIcon } from "@heroicons/react/outline";
import { BookmarkIcon as SaveIconDark } from "@heroicons/react/solid";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import axios from "axios";

const Post = ({
  postId,
  likes,
  views,
  comments,
  author,
  title,
  src,
  updateLikes,
}) => {
  const [comments2, setComments2] = useState(comments);
  const user = localStorage.getItem("user");
  const user_id = JSON.parse(user).user_id;
  const [likes2, setLikes2] = useState(likes);
  const [pressedLike, setPressedLike] = useState(false);
  const [pressedSave, setPressedSave] = useState(false);
  const [comment, setComment] = useState("");

  const handleSave = () => {
    console.log("saved");
    setPressedSave(!pressedSave);
    axios.post("http://localhost:5000/profile/updatesaved", {
      postId,
      user_id,
    });
  };

  const addComment = async () => {
    console.log("add comment");
    setComments2([comment, ...comments2]);
    setComment("");
    const res = await axios.post("http://localhost:5000/post/updatecomments", {
      comment,
      postId,
    });
    console.log("f");
  };

  const handleLikes = () => {
    setPressedLike(!pressedLike);
    console.log("pressed like button", pressedLike);
    if (pressedLike) {
      setLikes2(likes2 + 1);
    } else {
      if (likes2 != 0) setLikes2(likes2 - 1);
    }
    axios.post("http://localhost:5000/post//updatelikes", {
      pressedLike,
      postId,
    });
  };
  return (
    <div className="post bg-white mt-8 max-w-lg mx-auto shadow-2xl pb-4 rounded-md mb-8">
      <div className="post-header px-4 py-2 flex items-center justify-between">
        <div className="part1 flex space-x-4 items-center">
          <img
            src={`http://localhost:5000/avatars/avatar.png`}
            alt="author"
            className="w-8 h-8 rounded-full border-pink-600 border-solid border-2 p-0.5"
          />
          <span className="text-sm sm:text-lg text-gray-700">{author}</span>
        </div>
        <DotsHorizontalIcon className="w-4 sm:w-5" />
      </div>
      <div className="post-body">
        <img
          src={`http://localhost:5000/posts/${src}`}
          alt="post"
          className="w-full"
        />
      </div>
      <div className="post-footer flex justify-between items-center px-4 py-2 text-gray-800">
        <div className="part1  flex space-x-3">
          {likes2 >= "1" ? (
            <LikeIconRed
              className="w-6 h6 text-red-600"
              onClick={handleLikes}
            />
          ) : (
            <LikeIcon className="w-6 h6" onClick={handleLikes} />
          )}

          <CommentIcon className="w-6" />
          <ShareIcon className="w-6" />
        </div>
        {pressedSave ? (
          <SaveIconDark className="w-6" onClick={handleSave} />
        ) : (
          <SaveIcon className="w-6" onClick={handleSave} />
        )}
      </div>
      <div className="comments likes px-4">
        <div className="views likes flex justify-between">
          <div>
            <span className="text-md font-medium">{likes2} </span>
            <span>likes</span>
          </div>
          <div>
            <span className="text-md font-medium">{views}</span> views
          </div>
        </div>
        <div className="m-1 text-lg font-semibold text-gray-800 tracking-wide">
          {title}
        </div>
        <div className="comments">
          {comments2 != null &&
            comments2.map((comment) => (
              <li className=" list-none">
                <span className="text-gray-700 font-medium">
                  {JSON.parse(user).user_name}
                </span>{" "}
                <span className="text-gray-500 text-sm text">{comment}</span>
              </li>
            ))}
        </div>
        <div className="make-comment mt-2 flex items-center space-x-3 justify-between">
          <EmojiHappyIcon className="w-7" />
          <input
            type="text"
            className="w-full px-2 py-1 bg-white outline-none ring-1 ring-gray-400 focus:ring-2 focus:ring-blue-700 rounded-sm mr-1"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <span
            className="uppercase text-blue-700 font-medium text-sm cursor-pointer hover:text-blue-500"
            onClick={addComment}
          >
            post
          </span>
        </div>
      </div>
    </div>
  );
};

export default Post;
