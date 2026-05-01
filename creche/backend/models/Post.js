const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    commentText: { type: String, required: true },
    postedBy:    { type: String, required: true },
}, { timestamps: true });

const PostSchema = new mongoose.Schema({
    title:        { type: String, required: true },
    description:  { type: String, default: '' },
    location:     { type: String, default: '' },
    healthStatus: { type: String, default: '' },
    category:     { type: String, default: 'stray' },
    imageUrl:     { type: String, default: '' },
    postedBy:     { type: String, required: true },
    comments:     { type: [CommentSchema], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);