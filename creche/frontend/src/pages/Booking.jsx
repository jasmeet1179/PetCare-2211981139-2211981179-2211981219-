import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignInContext from '@/context/sigincontext/signinContext';
import Nav from '../components/navbar';

const Booking = () => {
    const use = useLocation();
    const navigate = useNavigate();
    const crecheInfo = use.state;
    const { User } = useContext(SignInContext);

    const [formData, setFormData] = useState({
        name: User?.userName || '',
        email: User?.email || '',
        phone: User?.phoneNumber || '',
        fromDate: '',
        toDate: '',
        petCount: 1,
        petType: '',
        petBreed: '',
        petSize: '',
        specialNoteForCrecheOwner: '',
        pickupDate: '',
        numberOfNights: 1,
        serviceLocation: '',
    });
    const [pageNo, setPageNo] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Auto-calculate nights when dates change
    useEffect(() => {
        if (formData.fromDate && formData.toDate) {
            const from = new Date(formData.fromDate);
            const to = new Date(formData.toDate);
            const nights = Math.max(1, Math.ceil((to - from) / (1000 * 60 * 60 * 24)));
            setFormData(prev => ({ ...prev, numberOfNights: nights }));
        }
    }, [formData.fromDate, formData.toDate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const pricePerDay = crecheInfo?.price || 0;
        const totalAmount = pricePerDay * formData.numberOfNights;

        // Navigate to payment page with all booking details
        navigate('/payment', {
            state: {
                crecheInfo,
                bookingDetails: formData,
                totalAmount,
            }
        });
    };

    const inputClass = "w-full p-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400";
    const labelClass = "block text-sm font-medium mb-1 text-gray-700";

    return (
        <div className="min-h-screen bg-gray-50">
            <Nav />
            <div className="max-w-lg mx-auto p-6 space-y-6">
                <h2 className="text-3xl font-semibold text-center text-gray-800">Booking Form</h2>

                {/* Step indicator */}
                <div className="flex items-center justify-center gap-2">
                    {['Your Details', 'Dates', 'Pet Info'].map((step, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                                pageNo === i ? 'bg-purple-600 text-white' : pageNo > i ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                            }`}>{pageNo > i ? '✓' : i + 1}</div>
                            {i < 2 && <div className={`w-10 h-1 rounded ${pageNo > i ? 'bg-green-500' : 'bg-gray-200'}`} />}
                        </div>
                    ))}
                </div>

                {/* Page 1 — Your Details */}
                {pageNo === 0 && (
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700">Your Details</h3>
                        <div className="mb-4">
                            <label className={labelClass}>Your Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} />
                        </div>
                        <div className="mb-4">
                            <label className={labelClass}>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} />
                        </div>
                        <div className="mb-4">
                            <label className={labelClass}>Phone</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className={inputClass} />
                        </div>
                        <button onClick={() => setPageNo(1)} className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition">
                            Next →
                        </button>
                    </div>
                )}

                {/* Page 2 — Dates */}
                {pageNo === 1 && (
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700">Booking Dates</h3>
                        <div className="mb-4">
                            <label className={labelClass}>From Date</label>
                            <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required className={inputClass}
                                min={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div className="mb-4">
                            <label className={labelClass}>To Date</label>
                            <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required className={inputClass}
                                min={formData.fromDate || new Date().toISOString().split('T')[0]} />
                        </div>
                        {formData.numberOfNights > 0 && formData.fromDate && formData.toDate && (
                            <div className="bg-purple-50 rounded-lg p-3 text-sm text-purple-700 mb-4">
                                🌙 {formData.numberOfNights} night{formData.numberOfNights > 1 ? 's' : ''} · ₹{(crecheInfo?.price || 0) * formData.numberOfNights} total
                            </div>
                        )}
                        <div className="mb-4">
                            <label className={labelClass}>Pickup Date & Time</label>
                            <input type="datetime-local" name="pickupDate" value={formData.pickupDate} onChange={handleChange} className={inputClass} />
                        </div>
                        <div className="mb-4">
                            <label className={labelClass}>Where do you need the service?</label>
                            <input type="text" name="serviceLocation" value={formData.serviceLocation} onChange={handleChange} placeholder="Your address" className={inputClass} />
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setPageNo(0)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition">← Prev</button>
                            <button onClick={() => setPageNo(2)} className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition">Next →</button>
                        </div>
                    </div>
                )}

                {/* Page 3 — Pet Info */}
                {pageNo === 2 && (
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700">Pet Details</h3>
                        <div className="mb-4">
                            <label className={labelClass}>Number of Pets</label>
                            <input type="number" name="petCount" value={formData.petCount} onChange={handleChange} min={1} required className={inputClass} />
                        </div>
                        <div className="mb-4">
                            <label className={labelClass}>Pet Type</label>
                            <select name="petType" value={formData.petType} onChange={handleChange} className={inputClass}>
                                <option value="">Select pet type</option>
                                {['Dog', 'Cat', 'Rabbit', 'Mouse', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className={labelClass}>Breed (optional)</label>
                            <input type="text" name="petBreed" value={formData.petBreed} onChange={handleChange} placeholder="e.g. Labrador" className={inputClass} />
                        </div>
                        <div className="mb-4">
                            <label className={labelClass}>Pet Size</label>
                            <select name="petSize" value={formData.petSize} onChange={handleChange} className={inputClass}>
                                <option value="">Select size</option>
                                {['0-5kg', '5-10kg', '10-20kg', '20-40kg'].map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className={labelClass}>Special note for sitter</label>
                            <textarea name="specialNoteForCrecheOwner" value={formData.specialNoteForCrecheOwner} onChange={handleChange}
                                rows={3} placeholder="Allergies, dietary needs, behaviour..." className={inputClass} />
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setPageNo(1)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition">← Prev</button>
                            <button onClick={handleSubmit} className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition">
                                Proceed to Pay →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Booking;