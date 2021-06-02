import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = {
        email,
        password,
      };
      axios.defaults.withCredentials = true;
      const result = await axios.post("http://localhost:5000/auth/login", data);
      console.log(result.data);
      localStorage.setItem("user", JSON.stringify(result.data));
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white form text-gray-800 flex flex-col ring-1 ring-gray-300 rounded-md px-8 py-6 shadow-lg">
        <h1 className="tracking-widest text-blue-700 font-medium text-2xl">
          Login here
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
        <button
          onClick={handleLogin}
          className="bg-blue-700 text-white font-medium uppercase px-4 py-2 hover:bg-blue-600 rounded-md mt-6"
        >
          Login
        </button>
        <div className="signup-link text-center mt-4 text-gray-500">
          Not a user?{" "}
          <Link
            to="/accounts/signup"
            className="cursor-pointer text-blue-700 font-semibold"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
