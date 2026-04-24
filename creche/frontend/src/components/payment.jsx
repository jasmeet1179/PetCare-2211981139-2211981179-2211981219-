import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "./navbar";
import SignInContext from "../context/sigincontext/signinContext";
import { useContext } from "react";

function MakePayment() {
    const location = useLocation();
    const navigate = useNavigate();
    const { User } = useContext(SignInContext);

    // Booking details passed from Booking.jsx via navigate state
    const bookingState = location.state || {};
    const { crecheInfo, bookingDetails, totalAmount } = bookingState;

    const [paymentMethod, setPaymentMethod] = useState("card");
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '', expiry: '', cvv: '', cardName: ''
    });
    const [upiId, setUpiId] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleCardChange = (e) => {
        setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    };

    const handlePayment = () => {
        if (paymentMethod === 'card') {
            if (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.cardName) {
                alert('Please fill in all card details');
                return;
            }
        }
        if (paymentMethod === 'upi' && !upiId) {
            alert('Please enter your UPI ID');
            return;
        }

        setProcessing(true);

        // Submit booking to backend after payment confirmation
        fetch('http://localhost:3000/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                crecheInfo,
                bookingDetails,
                userInfo: { User },
            }),
        }).then(response => {
            setProcessing(false);
            if (response.ok) {
                alert(`✅ Payment of ₹${totalAmount} successful! Booking confirmed.`);
                navigate('/');
            } else {
                alert('Payment went through but booking failed. Contact support.');
                navigate('/');
            }
        }).catch(() => {
            setProcessing(false);
            alert('Network error. Please try again.');
        });
    };

    const nights = bookingDetails?.numberOfNights || 1;
    const pricePerDay = crecheInfo?.price || totalAmount || 0;
    const total = totalAmount || (pricePerDay * nights);

    return (
        <div className="min-h-screen bg-gray-50">
            <Nav />
            <div className="max-w-lg mx-auto px-4 py-10">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-2xl font-bold text-center text-purple-600 mb-6">💳 Payment</h1>

                    {/* Order Summary */}
                    {crecheInfo && (
                        <div className="bg-purple-50 rounded-lg p-4 mb-6 text-sm">
                            <p className="font-semibold text-gray-700 mb-2">Order Summary</p>
                            <div className="flex justify-between text-gray-600">
                                <span>{crecheInfo.name || 'Creche Booking'}</span>
                                <span>₹{pricePerDay}/day</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Nights</span>
                                <span>{nights}</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between font-bold text-gray-800">
                                <span>Total</span>
                                <span className="text-purple-600">₹{total}</span>
                            </div>
                        </div>
                    )}

                    {/* Payment Method Selector */}
                    <div className="mb-6">
                        <p className="text-sm font-medium text-gray-700 mb-2">Payment Method</p>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { id: 'card', label: '💳 Card' },
                                { id: 'upi', label: '📱 UPI' },
                                { id: 'cod', label: '💵 Cash' },
                            ].map(m => (
                                <button
                                    key={m.id}
                                    type="button"
                                    onClick={() => setPaymentMethod(m.id)}
                                    className={`py-2 rounded-lg border text-sm font-medium transition ${
                                        paymentMethod === m.id
                                            ? 'bg-purple-600 text-white border-purple-600'
                                            : 'bg-white text-gray-600 border-gray-300 hover:border-purple-400'
                                    }`}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Card Details */}
                    {paymentMethod === 'card' && (
                        <div className="space-y-3 mb-6">
                            <input
                                type="text" name="cardName" placeholder="Name on card"
                                value={cardDetails.cardName} onChange={handleCardChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            <input
                                type="text" name="cardNumber" placeholder="Card number (16 digits)"
                                maxLength={16} value={cardDetails.cardNumber} onChange={handleCardChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="month" name="expiry" placeholder="Expiry"
                                    value={cardDetails.expiry} onChange={handleCardChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                                <input
                                    type="text" name="cvv" placeholder="CVV" maxLength={3}
                                    value={cardDetails.cvv} onChange={handleCardChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                                />
                            </div>
                        </div>
                    )}

                    {/* UPI */}
                    {paymentMethod === 'upi' && (
                        <div className="mb-6">
                            <input
                                type="text" placeholder="Enter UPI ID (e.g. name@upi)"
                                value={upiId} onChange={e => setUpiId(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>
                    )}

                    {/* Cash */}
                    {paymentMethod === 'cod' && (
                        <div className="mb-6 bg-yellow-50 rounded-lg p-4 text-sm text-yellow-700">
                            💵 You will pay ₹{total} in cash when you drop off your pet at the creche.
                        </div>
                    )}

                    <button
                        onClick={handlePayment}
                        disabled={processing}
                        className="w-full py-3 bg-purple-600 text-white text-lg font-semibold rounded-xl hover:bg-purple-700 transition disabled:opacity-50"
                    >
                        {processing ? 'Processing...' : `Pay ₹${total}`}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MakePayment;