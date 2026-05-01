const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName:       { type: String, required: true, unique: true },
    email:          { type: String, default: null },
    password:       { type: String, required: true },
    phoneNumber:    { type: String, default: null },
    profilePicture: { type: String, default: null },
    crecheOwner:    { type: Boolean, default: false },
    location:       { type: String, default: null },
    bookingHistory: { type: Array, default: [] },
    currentBooking: { type: Array, default: [] },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);