import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/navbar';
import SignInContext from '../context/sigincontext/signinContext';
import MultiPhotoUpload from '../components/photoupload';

const CLOUD_NAME = 'djp1oiwpe';
const UPLOAD_PRESET = 'petcare';

const CreatePost = () => {
    const { User } = useContext(SignInContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        healthStatus: '',
        category: 'stray',
        imageUrl: '',
    });
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', UPLOAD_PRESET);
        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: data,
            });
            const result = await res.json();
            setFormData(prev => ({ ...prev, imageUrl: result.secure_url }));
            setImagePreview(result.secure_url);
        } catch (err) {
            alert('Image upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!User.userName) { alert('Please log in to post'); return; }
        if (!formData.title.trim()) { alert('Title is required'); return; }
        setSubmitting(true);

        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${User.token}`,
            },
            body: JSON.stringify({ ...formData, postedBy: User.userName }),
        })
            .then(r => {
                if (r.ok) {
                    alert('Post created successfully!');
                    navigate('/community');
                } else {
                    alert('Error creating post');
                    setSubmitting(false);
                }
            })
            .catch(() => { alert('Error creating post'); setSubmitting(false); });
    };

    const CATEGORY_OPTIONS = [
        { value: 'stray', label: '🐾 Stray Sighting' },
        { value: 'adoption', label: '🏠 Adoption Listing' },

        { value: 'story', label: '📖 Pet Story / Tip' },
    ];

    const HEALTH_OPTIONS = ['Healthy', 'Injured', 'Sick', 'Unknown'];

    return (
        <div className="min-h-screen bg-orange-50">
            <Nav />
            <div className="max-w-xl mx-auto px-4 py-10">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">📝 Create a Post</h1>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <div className="grid grid-cols-2 gap-2">
                                {CATEGORY_OPTIONS.map(opt => (
                                    <button
                                        type="button"
                                        key={opt.value}
                                        onClick={() => setFormData(prev => ({ ...prev, category: opt.value }))}
                                        className={`py-2 px-3 rounded-lg border text-sm font-medium transition ${
                                            formData.category === opt.value
                                                ? 'bg-orange-500 text-white border-orange-500'
                                                : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Injured dog near Sector 14 market"
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Describe the situation, how to help, contact details..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Faridabad, Sector 14"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                        </div>

                        {/* Health Status (only for stray/lost) */}
                        {(formData.category === 'stray') && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Health Status</label>
                                <select
                                    name="healthStatus"
                                    value={formData.healthStatus}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                >
                                    <option value="">Select health status</option>
                                    {HEALTH_OPTIONS.map(h => (
                                        <option key={h} value={h}>{h}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                            {uploading && <p className="text-xs text-orange-500 mt-1">Uploading image...</p>}
                            {imagePreview && (
                                <img src={imagePreview} alt="preview"
                                    className="mt-2 rounded-lg w-full h-40 object-cover border" />
                            )}
                        </div>

                        {/* Posted by */}
                        <div className="bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-500">
                            Posting as: <span className="font-semibold text-gray-700">{User.userName || 'Not logged in'}</span>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting || uploading}
                            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
                        >
                            {submitting ? 'Posting...' : 'Submit Post'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;