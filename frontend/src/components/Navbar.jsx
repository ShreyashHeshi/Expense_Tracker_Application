import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner"; // Import Sonner
import Logo from "./shared/Logo";
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();

    // Load user from local storage
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    const [menuOpen, setMenuOpen] = useState(false);

    // Save user state to local storage when it changes
    // useEffect(() => {
    //     localStorage.setItem("user", JSON.stringify(user));
    // }, [user]);

    // Logout Handler
    const handleLogout = async () => {
        // setUser(null);
        // setMenuOpen(false);
        // localStorage.removeItem("user"); // Clear storage
        try {
            const res = await axios.get("http://localhost:8000/api/v1/user/logout");
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }

        } catch (err) {
            console.log(err);
            toast.error(error.response.data);

        }
        // toast.success("You have been logged out successfully!");
    };

    return (
        <nav className="border-b border-gray-300 bg-white shadow-md">
            <Toaster position="top-right" richColors /> {/* Sonner Toaster */}

            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Logo />

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-8 py-6 text-2xl">
                    <Link to="/" className="text-gray-700 hover:text-blue-600 font-semibold">
                        Home
                    </Link>
                    <Link to="/about" className="text-gray-700 hover:text-blue-600 font-semibold">
                        About
                    </Link>
                    <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-semibold">
                        Contact
                    </Link>
                </div>

                {/* Authentication / User Menu */}
                <div className="relative">
                    {user ? (
                        <div className="relative">
                            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                                <img
                                    src="https://github.com/shadcn.png"
                                    alt="User Avatar"
                                    className="w-20 h-20 rounded-full border"
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
                                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <button
                                onClick={() => navigate("/login")} // Navigate to login page
                                className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white"
                            >
                                Login
                            </button>
                            <Link
                                to="/signup"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Signup
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
