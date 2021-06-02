import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookmarkIcon as SavedIcon } from "@heroicons/react/outline";
import { NewspaperIcon as PostsIcon } from "@heroicons/react/outline";
import axios from "axios";

const Profile = () => {
  const [info, setInfo] = useState("");

  useEffect(async () => {
    try {
      let user = await localStorage.getItem("user");
      user = await JSON.parse(user);
      let res = await axios.post("http://localhost:5000/profile/info", {
        id: user.user_id,
      });
      setInfo(res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <div className="flex p-16 mb-4 mt-2 justify-around">
        <div className="part1">
          <img
            src={`http://localhost:5000/avatars/avatar.png`}
            alt="author"
            className="w-28 h-28 md:w-28 md:h-28 rounded-full border-[1px] border-gray-400"
          />
        </div>
        <div className="part2">
          <div className="font-mono text-3xl text-gray-600 tracking-wide">
            {info.username}
          </div>
          <div className="flex justify-around mt-4 space-x-6">
            <div className="flex space-x-1 items-center">
              <span className="font-medium text-xl">{info?.posts?.length}</span>{" "}
              <span className="text-gray-600">posts</span>
            </div>
            <div className="flex space-x-1 items-center">
              <span className="font-medium text-xl">{info?.followers}</span>
              <span className="text-gray-600">followers</span>
            </div>
            <div className="flex space-x-1 items-center">
              <span className="font-medium text-xl">{info?.following}</span>
              <span className="text-gray-600">following</span>
            </div>
          </div>
          <div className="mt-4 text-xl text-gray-700 font-light font-serif">
            {info.email}
          </div>
        </div>
      </div>
      <div className="border-t-[1px] border-gray-500">
        <div className="flex justify-center space-x-6 text-gray-700">
          <Link className="flex uppercase font-medium text-md space-x-1">
            <SavedIcon className="w-4" />
            <span>saved</span>
          </Link>
          <Link className="flex uppercase font-medium text-md space-x-1">
            <PostsIcon className="w-4" />
            <span>posts</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
