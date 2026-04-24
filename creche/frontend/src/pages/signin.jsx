// import React, { useState } from "react";
// import { useContext,useEffect } from "react";
// import SignInContext from "../context/sigincontext/signinContext";
// import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// ... (old code kept as comments)

import React, { useState } from "react";
import { useContext } from "react";
import SignInContext from "../context/sigincontext/signinContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const a = useContext(SignInContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [ownerSecretKey, setOwnerSecretKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
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
      const res = await fetch("http://localhost:3000/signin", {
        method: "POST",
        body: JSON.stringify({
          username,
          currentPassword: password,
          role,
          phoneNumber,
          email,
          ownerSecretKey: role === "crecheowner" ? ownerSecretKey : undefined,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.status === "invalid owner key") {
        setError("❌ Invalid owner secret key. Contact the admin to get the key.");
      } else if (data.status === "signedin") {
        callHandler(data.data, role, data.token);
      } else if (data.status === "user already exist") {
        callHandler(data.data, "user", data.token);
      } else if (data.status === "crecheowner loggedin") {
        callHandler(data.data, "crecheowner", data.token);
      } else if (data.status === "wrong credentials") {
        setError("Wrong username or password. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
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
          <div className="text-center mb-6">
            <div className="text-5xl mb-2">🐾</div>
            <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">Create Account</h1>
            <p className="text-stone-500 text-sm font-semibold mt-1">Join and find the perfect creche for your pet</p>
          </div>

          {/* Role Toggle */}
          <div className="flex bg-stone-100 rounded-xl p-1 mb-5 gap-1">
            <button
              type="button"
              onClick={() => { setRole("user"); setOwnerSecretKey(""); setError(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                role === "user"
                  ? "bg-orange-400 text-white shadow"
                  : "bg-transparent text-stone-500 hover:text-stone-700"
              }`}
            >
              Pet Owner
            </button>
            <button
              type="button"
              onClick={() => { setRole("crecheowner"); setError(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                role === "crecheowner"
                  ? "bg-orange-400 text-white shadow"
                  : "bg-transparent text-stone-500 hover:text-stone-700"
              }`}
            >
              Creche Owner
            </button>
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
                placeholder="e.g. rahul_pet"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Phone Number</label>
              <input
                type="tel"
                className="px-4 py-3 rounded-xl border-2 border-stone-200 bg-stone-50 text-stone-900 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                placeholder="+91 98765 43210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Email</label>
              <input
                type="email"
                className="px-4 py-3 rounded-xl border-2 border-stone-200 bg-stone-50 text-stone-900 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-stone-200 bg-stone-50 text-stone-900 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                  placeholder="Create a password"
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

            {/* Secret key — only shown for creche owner */}
            {role === "crecheowner" && (
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">
                  Owner Secret Key 🔑
                </label>
                <div className="relative">
                  <input
                    type={showSecretKey ? "text" : "password"}
                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-orange-300 bg-orange-50 text-stone-900 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all duration-200"
                    placeholder="Enter the owner secret key"
                    value={ownerSecretKey}
                    required
                    onChange={(e) => setOwnerSecretKey(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecretKey(!showSecretKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-lg bg-transparent border-none cursor-pointer p-0"
                  >
                    {showSecretKey ? "🙈" : "👁️"}
                  </button>
                </div>
                <p className="text-xs text-orange-500 font-medium">
                  Contact the admin to get the secret key.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`mt-1 py-3 rounded-xl text-white font-extrabold text-base tracking-wide transition-all duration-200 ${
                loading
                  ? "bg-stone-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 hover:-translate-y-0.5 shadow-lg hover:shadow-orange-200"
              }`}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-5 text-sm">
            <span className="text-stone-500 font-semibold">Already have an account? </span>
            <Link to="/login" className="text-orange-500 font-extrabold hover:text-orange-600 transition-colors duration-200">
              Log In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SignIn;