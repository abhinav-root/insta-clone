import React from "react";
import { HomeIcon } from "@heroicons/react/outline";
import { ChatIcon as MessagesIcon } from "@heroicons/react/outline";
import { HeartIcon as NotificationsIcon } from "@heroicons/react/outline";
import { UserCircleIcon as ProfileIcon } from "@heroicons/react/outline";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between bg-white shadow-lg px-2 py-2 sm:px-8 sm:py-4 md:px-14 md:py-5">
      <img src={Logo} alt="logo icon" className="w-24 sm:w-28 md:w-32" />
      <div className="flex text-gray-700 space-x-1 sm:space-x-4 md:space-x-6">
        <Link exact="true" to="/">
          <HomeIcon className="w-7 sm:w-8 md:w-9 hover:text-blue-700 cursor-pointer" />
        </Link>
        <Link to="/messages">
          <MessagesIcon className="w-7 sm:w-8 md:w-9 hover:text-blue-700 cursor-pointer" />
        </Link>
        <Link to="/notifications">
          <NotificationsIcon className="w-7 sm:w-8 md:w-9 hover:text-blue-700 cursor-pointer" />
        </Link>
        <Link to="/profile">
          <ProfileIcon className="w-7 sm:w-8 md:w-9 hover:text-blue-700 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
