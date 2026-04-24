import React, { useState, useContext } from 'react';
import Nav from '../../components/navbar';
import { Link, useNavigate } from 'react-router-dom';
import SignInContext from '../../context/sigincontext/signinContext';

const CLOUD_NAME = 'djp1oiwpe';
const UPLOAD_PRESET = 'petcare';

const OwnerProfile = () => {
    const { User } = useContext(SignInContext);
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);
    const [profilePic, setProfilePic] = useState(User?.profilePicture || null);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
    const [passwordMsg, setPasswordMsg] = useState('');

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
            alert('Profile picture updated! (Note: refresh may be needed to reflect everywhere)');
        } catch {
            alert('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (passwords.newPass !== passwords.confirm) {
            setPasswordMsg('New passwords do not match.');
            return;
        }
        if (passwords.newPass.length < 6) {
            setPasswordMsg('Password must be at least 6 characters.');
            return;
        }
        // TODO: wire to a backend /changepassword endpoint
        setPasswordMsg('Password change coming soon — backend endpoint needed.');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Nav />
            <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">

                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
                    <div className="relative mb-4">
                        <img
                            src={profilePic || 'defaultuserpic.png'}
                            alt="Profile"
                            className="h-28 w-28 rounded-full border-4 border-purple-300 object-cover"
                        />
                        <label className="absolute bottom-0 right-0 bg-purple-500 text-white text-xs rounded-full p-1.5 cursor-pointer hover:bg-purple-600">
                            ✏️
                            <input type="file" accept="image/*" className="hidden" onChange={handleProfilePicUpload} />
                        </label>
                    </div>
                    {uploading && <p className="text-xs text-purple-500 mb-2">Uploading...</p>}
                    <h2 className="text-2xl font-bold text-gray-800">{User?.userName}</h2>
                    <p className="text-gray-500 text-sm mt-1">Creche Owner · {User?.location}</p>
                    {User?.phoneNumber && <p className="text-gray-500 text-sm">📞 {User.phoneNumber}</p>}
                    {User?.email && <p className="text-gray-500 text-sm">✉️ {User.email}</p>}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <Link to="/owner">
                            <button className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition text-sm">
                                📋 My Dashboard
                            </button>
                        </Link>
                        <Link to="/registercreche" state={{ editing: true }}>
                            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition text-sm">
                                ✏️ Edit Creche
                            </button>
                        </Link>
                        <Link to="/community">
                            <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition text-sm">
                                🐾 Community
                            </button>
                        </Link>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition text-sm"
                        >
                            🚪 Logout
                        </button>
                    </div>
                </div>

                {/* Change Password */}
                <div className="bg-white rounded-xl shadow p-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-700">Change Password</h3>
                        <button
                            onClick={() => setShowPasswordForm(!showPasswordForm)}
                            className="text-purple-500 text-sm font-medium"
                        >
                            {showPasswordForm ? 'Cancel' : 'Change'}
                        </button>
                    </div>
                    {showPasswordForm && (
                        <form onSubmit={handlePasswordChange} className="mt-4 space-y-3">
                            <input
                                type="password" placeholder="Current password"
                                value={passwords.current}
                                onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            <input
                                type="password" placeholder="New password"
                                value={passwords.newPass}
                                onChange={e => setPasswords({ ...passwords, newPass: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            <input
                                type="password" placeholder="Confirm new password"
                                value={passwords.confirm}
                                onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            {passwordMsg && <p className="text-sm text-red-500">{passwordMsg}</p>}
                            <button type="submit"
                                className="w-full bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition text-sm">
                                Update Password
                            </button>
                        </form>
                    )}
                </div>

            </div>
        </div>
    );
};

export default OwnerProfile;