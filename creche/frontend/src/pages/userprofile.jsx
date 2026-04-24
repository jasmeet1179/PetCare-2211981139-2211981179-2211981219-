import React, { useState, useContext, useRef } from "react";
import Nav from "../components/navbar";
import { Link, useNavigate } from "react-router-dom";
import SignInContext from "../context/sigincontext/signinContext";

const CLOUD_NAME = 'djp1oiwpe';
const UPLOAD_PRESET = 'petcare';

function UserProfilepage() {
    const [activeTab, setActiveTab] = useState("history");
    const { User, signOutHandler } = useContext(SignInContext);
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState(User.profilePicture || null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef();

    const handleLogout = () => {
        signOutHandler();
        navigate('/');
    };

    const handleProfilePicUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', UPLOAD_PRESET);
        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: 'POST', body: data,
            });
            const result = await res.json();
            setProfilePic(result.secure_url);
            alert('Profile picture updated!');
        } catch {
            alert('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const tabBtn = (tab, label) => (
        <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === tab ? "bg-red-500 text-white" : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
        >
            {label}
        </button>
    );

    return (
        <>
            <Nav />
            <div className="grid grid-cols-4 min-h-screen bg-gray-50">

                {/* Left sidebar */}
                <div className="col-span-1 flex flex-col items-center py-10 bg-white shadow-sm">
                    <div className="relative">
                        <img
                            src={profilePic || "defaultuserpic.png"}
                            className="h-40 w-40 rounded-full border-4 border-gray-200 object-cover"
                            alt="profile"
                        />
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="absolute bottom-1 right-1 bg-green-500 text-white text-xs rounded-full px-2 py-1 hover:bg-green-600"
                        >
                            ✏️
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleProfilePicUpload}
                        />
                    </div>
                    {uploading && <p className="text-xs text-green-500 mt-2">Uploading...</p>}
                    <p className="text-lg font-semibold text-gray-700 mt-4">{User.userName}</p>
                    <p className="text-sm text-gray-400">{User.email}</p>
                    {User.phoneNumber && <p className="text-sm text-gray-400">📞 {User.phoneNumber}</p>}
                </div>

                {/* Right content */}
                <div className="col-span-3 p-6">
                    <div className="text-3xl text-gray-600 mb-4">
                        Hey, <span className="font-semibold text-gray-800">{User.userName}</span> 👋
                    </div>

                    {/* Tab buttons */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tabBtn("history", "📋 Booking History")}
                        {tabBtn("current", "⏳ Current Booking")}
                        {User.crecheOwner && (
                            <Link to="/registercreche" state={{ editing: true }}>
                                <button className="px-4 py-2 bg-gray-200 text-black rounded-md text-sm font-medium hover:bg-gray-300">
                                    ⚙️ Creche Settings
                                </button>
                            </Link>
                        )}
                        {User.crecheOwner && (
                            <Link to="/owner">
                                <button className="px-4 py-2 bg-purple-500 text-white rounded-md text-sm font-medium hover:bg-purple-600">
                                    📊 Dashboard
                                </button>
                            </Link>
                        )}
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-md text-sm font-medium hover:bg-red-200"
                        >
                            🚪 Logout
                        </button>
                    </div>

                    {/* Booking History */}
                    {activeTab === "history" && (
                        <div>
                            {User.bookingHistory && User.bookingHistory.length > 0 ? (
                                User.bookingHistory.slice().reverse().map((booking, index) => (
                                    <div key={index}
                                        className="bg-white border border-slate-200 p-5 rounded-xl shadow mb-4 hover:shadow-md transition">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-semibold text-gray-800">{booking.crecheName}</p>
                                                <p className="text-sm text-gray-500">📍 {booking.location}</p>
                                                <p className="text-sm text-gray-500">📅 {booking.date} at {booking.time}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-purple-600">₹{booking.price}</p>
                                                <Link to={`/biggercard?id=${booking.id}&location=${booking.location}`}>
                                                    <button className="mt-2 bg-red-500 text-white text-sm px-3 py-1 rounded-md hover:bg-red-600">
                                                        Book again
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-16 text-gray-400">
                                    <div className="text-5xl mb-4">📋</div>
                                    <p>No booking history yet.</p>
                                    <Link to="/">
                                        <button className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-lg">Find a Creche</button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Current Bookings */}
                    {activeTab === "current" && (
                        <div>
                            {User.currentBooking && User.currentBooking.length > 0 ? (
                                User.currentBooking.map((booking, index) => (
                                    <div key={index}
                                        className="bg-white border border-slate-200 p-5 rounded-xl shadow mb-4 hover:shadow-md transition">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-semibold text-gray-800">{booking.crecheName}</p>
                                                <p className="text-sm text-gray-500">📍 {booking.location}</p>
                                                <p className="text-sm text-gray-500">📅 {booking.date} at {booking.time}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-purple-600">₹{booking.price}</p>
                                                <span className="inline-block mt-2 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                                                    Active
                                                </span>
                                                <button
                                                    onClick={() => {
                                                        if (!window.confirm('Cancel this booking?')) return;
                                                        fetch('http://localhost:3000/cancelbooking', {
                                                            method: 'POST',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ userName: User.userName, bookingIndex: index }),
                                                        })
                                                            .then(r => r.json())
                                                            .then(data => {
                                                                if (data.status === 'cancelled') {
                                                                    alert('Booking cancelled.');
                                                                    window.location.reload();
                                                                }
                                                            })
                                                            .catch(() => alert('Error cancelling booking.'));
                                                    }}
                                                    className="block mt-2 bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full hover:bg-red-200 transition"
                                                >
                                                    Cancel Booking
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-16 text-gray-400">
                                    <div className="text-5xl mb-4">⏳</div>
                                    <p>No active bookings.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserProfilepage;