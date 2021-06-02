import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const handleSignup = () => {
    const data = {
      email,
      username,
      password,
      verifyPassword,
    };
    axios.defaults.withCredentials = true;
    if (email && username && password && verifyPassword)
      axios
        .post("http://localhost:5000/auth/signup", data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

    setEmail("");
    setUsername("");
    setPassword("");
    setVerifyPassword("");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white form text-gray-800 flex flex-col ring-1 ring-gray-300 rounded-md px-8 py-6 shadow-lg">
        <h1 className="tracking-widest text-blue-700 font-medium text-2xl">
          Create your account
        </h1>
        <div className="input my-2 flex flex-col">
          <label htmlFor="email">Enter email</label>
          <input
            placeholder="email"
            type="email"
            id="email"
            className="ring-1 ring-gray-500 rounded-sm px-3 py-1 outline-none focus:ring-2 focus:ring-blue-700 mt-2"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="input my-2 flex flex-col">
          <label htmlFor="username">Enter username</label>
          <input
            placeholder="username"
            type="text"
            id="username"
            className="ring-1 ring-gray-500 rounded-sm px-3 py-1 outline-none focus:ring-2 focus:ring-blue-700 mt-2"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div className="input my-3 flex flex-col">
          <label htmlFor="password">Enter password</label>
          <input
            placeholder="password"
            type="password"
            id="password"
            className="ring-1 ring-gray-500 rounded-sm px-3 py-1 outline-none focus:ring-2 focus:ring-blue-700 mt-2"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="input my-3 flex flex-col">
          <label htmlFor="verifyPassword">Confirm password</label>
          <input
            placeholder="re-enter password"
            type="password"
            id="verifyPassword"
            className="ring-1 ring-gray-500 rounded-sm px-3 py-1 outline-none focus:ring-2 focus:ring-blue-700 mt-2"
            onChange={(e) => setVerifyPassword(e.target.value)}
            value={verifyPassword}
          />
        </div>
        <button
          onClick={handleSignup}
          className="bg-blue-700 text-white font-medium uppercase px-4 py-2 hover:bg-blue-600 rounded-md mt-6"
        >
          Signup
        </button>
        <div className="signup-link text-center mt-4 text-gray-500">
          Already a user?{" "}
          <Link
            to="/accounts/login"
            className="cursor-pointer text-blue-700 font-semibold"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
