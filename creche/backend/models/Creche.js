const mongoose = require('mongoose');

const CrecheSchema = new mongoose.Schema({
    name:               { type: String, required: true },
    displayimg:         { type: String, default: '' },
    allimg:             { type: [String], default: [] },
    certificate:        { type: [String], default: [] },
    location:           { type: String, required: true },
    shortdescription:   { type: String, default: '' },
    fulldescription:    { type: String, default: '' },
    price:              { type: Number, default: 0 },
    rating:             { type: Number, default: 0 },
    ownername:          { type: String, default: '' },
    skills:             { type: [String], default: [] },
    summary:            { type: String, default: '' },
    noofpetswatched:    { type: String, default: '' },
    petsize:            { type: Array, default: [] },
    pottybreaks:        { type: String, default: '' },
    typeOfHome:         { type: String, default: '' },
    Emergencytransport: { type: String, default: '' },
    petTypeAccepted:    { type: [String], default: [] },
    phoneNumber:        { type: String, default: '' },
    email:              { type: String, default: '' },
    userid:             { type: String, default: '' },
    crecheid:           { type: String, default: '' },
    bookings:           { type: Array, default: [] },
    reviews:            { type: Array, default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Creche', CrecheSchema);