import React, { useEffect, useState, useContext } from 'react';
import Nav from '../../components/navbar';
import { Link } from 'react-router-dom';
import SignInContext from '../../context/sigincontext/signinContext';

const OwnerHome = () => {
    const { User } = useContext(SignInContext);
    const [creche, setCreche] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('bookings');

    useEffect(() => {
        if (!User?.id || !User?.location) { setLoading(false); return; }
        fetch(`http://localhost:3000/ownerbookings?location=${User.location}&userid=${User.id}`)
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (data) {
                    setCreche(data.creche);
                    setBookings(data.bookings);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [User]);

    const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.price) || 0), 0);

    if (loading) return <div className="min-h-screen bg-gray-50"><Nav /><div className="text-center py-20 text-gray-400 text-xl">Loading...</div></div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Nav />

            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-10">
                <div className="max-w-5xl mx-auto flex items-center gap-6">
                    <img
                        src={creche?.displayimg || User?.profilePicture || 'defaultuserpic.png'}
                        alt="Creche"
                        className="h-20 w-20 rounded-full border-4 border-white object-cover"
                    />
                    <div>
                        <h1 className="text-3xl font-bold">{creche?.name || 'Your Creche'}</h1>
                        <p className="opacity-80 mt-1">📍 {User?.location || 'Location not set'} &nbsp;·&nbsp; 👤 {User?.userName}</p>
                        {creche?.phoneNumber && <p className="opacity-80 text-sm">📞 {creche.phoneNumber}</p>}
                    </div>
                    <div className="ml-auto">
                        <Link to="/registercreche" state={{ editing: true }}>
                            <button className="bg-white text-purple-600 font-semibold px-5 py-2 rounded-full shadow hover:shadow-md transition text-sm">
                                ✏️ Edit Creche
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats row */}
            <div className="max-w-5xl mx-auto px-6 -mt-5">
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl shadow p-5 text-center">
                        <div className="text-3xl font-bold text-purple-600">{bookings.length}</div>
                        <div className="text-gray-500 text-sm mt-1">Total Bookings</div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-5 text-center">
                        <div className="text-3xl font-bold text-green-500">₹{totalRevenue.toLocaleString()}</div>
                        <div className="text-gray-500 text-sm mt-1">Total Revenue</div>
                    </div>
                    <div className="bg-white rounded-xl shadow p-5 text-center">
                        <div className="text-3xl font-bold text-yellow-500">{creche?.rating || '—'} ⭐</div>
                        <div className="text-gray-500 text-sm mt-1">Rating</div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-5xl mx-auto px-6 mt-8">
                <div className="flex gap-2 border-b mb-6">
                    {['bookings', 'details', 'reviews'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 text-sm font-medium capitalize border-b-2 transition ${
                                activeTab === tab
                                    ? 'border-purple-500 text-purple-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab === 'bookings' ? '📋 Bookings' : tab === 'details' ? '🏠 Creche Details' : '⭐ Reviews'}
                        </button>
                    ))}
                </div>

                {/* Bookings tab */}
                {activeTab === 'bookings' && (
                    <div>
                        {bookings.length === 0 ? (
                            <div className="text-center py-16 text-gray-400">
                                <div className="text-5xl mb-4">📋</div>
                                <p>No bookings yet. Share your creche link to get started!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {bookings.slice().reverse().map((b, i) => (
                                    <div key={i} className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row md:items-center gap-4">
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-800">{b.name || 'Pet Owner'}</p>
                                            <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-3">
                                                <span>📅 {b.fromDate} → {b.toDate}</span>
                                                <span>🐾 {b.petType} ({b.petBreed || 'breed not specified'})</span>
                                                <span>🔢 {b.petCount} pet{b.petCount > 1 ? 's' : ''}</span>
                                            </div>
                                            {b.specialNoteForCrecheOwner && (
                                                <p className="text-sm text-blue-600 mt-1">📝 Note: {b.specialNoteForCrecheOwner}</p>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-green-600">₹{creche?.price || 0}/day</div>
                                            <div className="text-xs text-gray-400">{b.email || ''}</div>
                                            <div className="text-xs text-gray-400">{b.phone || ''}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Creche Details tab */}
                {activeTab === 'details' && (
                    <div className="bg-white rounded-xl shadow p-6 space-y-4">
                        {!creche ? (
                            <div className="text-center py-10 text-gray-400">
                                <p className="mb-4">You haven't registered your creche yet.</p>
                                <Link to="/registercreche" state={{ editing: false }}>
                                    <button className="bg-purple-500 text-white px-6 py-2 rounded-lg">Register Your Creche</button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><span className="text-gray-500">Creche Name</span><p className="font-semibold">{creche.name}</p></div>
                                    <div><span className="text-gray-500">Price</span><p className="font-semibold">₹{creche.price}/day</p></div>
                                    <div><span className="text-gray-500">Location</span><p className="font-semibold">{creche.location}</p></div>
                                    <div><span className="text-gray-500">Home Type</span><p className="font-semibold">{creche.typeOfHome || '—'}</p></div>
                                    <div><span className="text-gray-500">Pets Watched at Once</span><p className="font-semibold">{creche.noofpetswatched || '—'}</p></div>
                                    <div><span className="text-gray-500">Potty Breaks/day</span><p className="font-semibold">{creche.pottybreaks || '—'}</p></div>
                                    <div><span className="text-gray-500">Emergency Transport</span><p className="font-semibold">{creche.Emergencytransport || '—'}</p></div>
                                    <div><span className="text-gray-500">Phone</span><p className="font-semibold">{creche.phoneNumber || '—'}</p></div>
                                </div>
                                <div>
                                    <span className="text-gray-500 text-sm">Accepted Pet Types</span>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {(creche.petTypeAccepted || []).map((p, i) => (
                                            <span key={i} className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">{p}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-gray-500 text-sm">About</span>
                                    <p className="text-gray-700 text-sm mt-1">{creche.fulldescription}</p>
                                </div>
                                <Link to="/registercreche" state={{ editing: true }}>
                                    <button className="w-full mt-2 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition">
                                        ✏️ Edit Creche Details
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                )}

                {/* Reviews tab */}
                {activeTab === 'reviews' && (
                    <div className="space-y-4">
                        {!creche?.reviews || creche.reviews.length === 0 ? (
                            <div className="text-center py-16 text-gray-400">
                                <div className="text-5xl mb-4">⭐</div>
                                <p>No reviews yet.</p>
                            </div>
                        ) : (
                            creche.reviews.map((r, i) => (
                                <div key={i} className="bg-white rounded-xl shadow p-5">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-gray-800">{r.username || 'Anonymous'}</span>
                                        <span className="text-yellow-500">{'★'.repeat(r.rating || 0)}{'☆'.repeat(5 - (r.rating || 0))}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm">{r.review || r.text || r}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            <div className="h-16" />
        </div>
    );
};

export default OwnerHome;