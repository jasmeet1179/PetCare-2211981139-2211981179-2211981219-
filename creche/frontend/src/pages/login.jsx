import React, { useState } from "react";
import { useContext } from "react";
import SignInContext from "../context/sigincontext/signinContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const a = useContext(SignInContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function callHandler(data, role, token) {
    a.signInHandler(data, token);
    if (role === "crecheowner") {
      navigate("/owner");
    } else {
      navigate("/");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify({ username, currentPassword: password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.status === "loggedin") {
        callHandler(data.data, "user", data.token);
      } else if (data.status === "crecheowner loggedin") {
        callHandler(data.data, "crecheowner", data.token);
      } else {
        setError("Wrong username or password. Please try again.");
      }
    } catch (err) {
      setError("Could not connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-yellow-50 to-emerald-50 flex justify-center items-center px-4 py-8 relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-orange-200 opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-200 opacity-25 blur-3xl pointer-events-none" />

      {/* Back link */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-amber-800 font-bold text-sm tracking-wide hover:text-orange-500 transition-colors duration-200"
      >
        ← Back to Home
      </Link>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex overflow-hidden">

        {/* Accent strip */}
        <div className="w-1.5 bg-gradient-to-b from-orange-400 to-emerald-500 flex-shrink-0" />

        {/* Card content */}
        <div className="flex-1 p-8 sm:p-10">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-2">🐾</div>
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">Welcome Back</h1>
            <p className="text-stone-500 text-sm font-semibold mt-1">Log in to manage your bookings</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-2.5 text-sm font-semibold mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Username</label>
              <input
                type="text"
                className="px-4 py-3 rounded-xl border-2 border-stone-200 bg-stone-50 text-stone-900 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                placeholder="Your username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-stone-200 bg-stone-50 text-stone-900 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                  placeholder="Your password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lg bg-transparent border-none cursor-pointer p-0"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end -mt-2">
              <Link
                to="/forgot-password"
                className="text-xs font-bold text-orange-400 hover:text-orange-600 transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`py-3 rounded-xl text-white font-extrabold text-base tracking-wide transition-all duration-200 ${
                loading
                  ? "bg-stone-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 hover:-translate-y-0.5 shadow-lg hover:shadow-orange-200"
              }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 text-sm">
            <span className="text-stone-500 font-semibold">Don't have an account? </span>
            <Link to="/signin" className="text-orange-500 font-extrabold hover:text-orange-600 transition-colors duration-200">
              Sign Up
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LogIn;