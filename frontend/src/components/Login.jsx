import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./shared/Logo.jsx";
import axios from "axios";
import { Toaster, toast } from "sonner";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      const res = await axios.post("http://localhost:8000/api/v1/user/login", input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Response received:", res); // Log full response

      if (res.data.success) {
        toast.success(res.data.message || "Login successful");

        // Save the token to localStorage (Instead of response.user, we use the token directly)
        localStorage.setItem("token", res.data.token);

        // Optionally, save user info to localStorage if needed
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Log just before navigating to ensure the code reaches here
        console.log("Navigating to home...");

        // Delay navigation slightly to ensure state is set
        setTimeout(() => {
          navigate("/"); // Navigate to home after login
        }, 200); // Adding a short delay before navigating to make sure state changes are applied
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      toast.error(err.response?.data?.message || "Something went wrong! Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <Toaster /> {/* Ensure toast notifications work */}

      <form onSubmit={submitHandler} className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <div className="w-full flex justify-center mb-5">
          <Logo />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">Welcome! Login here</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Enter your email"
            value={input.email}
            onChange={changeHandler}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border border-violet-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Enter your password"
            value={input.password}
            onChange={changeHandler}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-violet-500 text-white py-2 rounded-full hover:bg-violet-600 transition duration-300"
        >
          Login
        </button>
        <p className="text-sm text-center mt-3">
          New user?{" "}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
