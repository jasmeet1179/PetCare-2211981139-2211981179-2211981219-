import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignInContext from "../context/sigincontext/signinContext.js";

const Nav = () => {
    const { User, signOutHandler } = useContext(SignInContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        signOutHandler();
        navigate('/');
    };

    return (
        <div className="flex justify-between items-center p-4 bg-white bg-opacity-80 shadow-md rounded-md border-2">
            <div className="flex items-center space-x-6">
                <Link to="/" className="text-gray-700 hover:text-blue-500 transition duration-200">Home</Link>
                <Link to="/community" className="text-gray-700 hover:text-blue-500 transition duration-200">Community</Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-500 transition duration-200">Contact</Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-500 transition duration-200">About Us</Link>
            </div>

            <div className="flex items-center gap-4">
                {User.userName ? (
                    <div className="flex items-center gap-3">
                        <Link to={User.crecheOwner ? "/owner" : "/userProfile"} className="flex items-center space-x-2">
                            <img
                                src={User.profilePicture || "defaultuserpic.png"}
                                alt="Profile"
                                className="rounded-full h-10 w-10 border border-gray-300 object-cover"
                            />
                            <span className="text-gray-700">{User.userName}</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-red-500 hover:text-red-700 font-medium transition"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <Link to="/signin" className="text-gray-700 hover:text-blue-500 transition duration-200">Sign Up</Link>
                        <span className="text-gray-400">|</span>
                        <Link to="/login" className="text-gray-700 hover:text-blue-500 transition duration-200">Log In</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Nav;