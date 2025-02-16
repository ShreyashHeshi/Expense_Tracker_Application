import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "./shared/Logo.jsx";
import axios from 'axios';
import { Toaster, toast } from "sonner";

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault(); // Prevent page refresh
        console.log("Input Data:", input);

        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/register", input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            console.log(res.data);
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login"); // Navigate to login after signup
            } else {
                toast.error(res.data.message || "Signup failed");
            }
        } catch (err) {
            console.error(err);
            //toast.error(error.res.data.message);
            //toast.error("Something went wrong! Please try again.");
            toast.error(err.response?.data?.message || "Something went wrong! Please try again."); // ? means optional chaning it prevents error if property is not defined
        }
    };

    return (
        // <div className="flex items-center justify-center w-screen h-screen">
        //     <form action="">
        //         <div>
        //             <label>Full Name</label>
        //             <input type="text" name="fullame"></input>
        //         </div>
        //         <div>
        //             <label>Email</label>
        //             <input type="email" name="email"></input>
        //         </div>
        //         <div>
        //             <label>Password</label>
        //             <input type="password" name="password"></input>
        //         </div>
        //     </form>
        // </div>

        <div className="flex items-center justify-center w-screen h-screen bg-gray-100">

            <form className="bg-white p-8 rounded-2xl shadow-lg w-96" onSubmit={submitHandler}>
                <div className="w-full flex justify-center mb-5">
                    <Logo></Logo>
                </div>
                <h2 className="text-2xl font-semibold text-center mb-6">New User? Sign Up</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                    <input
                        type="text"
                        name="fullname"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                        placeholder="Enter your full name"
                        value={input.fullname}
                        onChange={changeHandler}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                        placeholder="Enter your email"
                        value={input.email}
                        onChange={changeHandler}
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
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-violet-500 text-white py-2 rounded-full hover:bg-violet-600 transition duration-300"
                >
                    Sign Up
                </button>
                <p className="text-sm text-center">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
            </form>
        </div>
    )
}

export default Signup