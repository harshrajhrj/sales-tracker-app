const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    google_id: {
        type: String,
        required: true
    },
    profile_url: {
        type: String,
        required: true
    }
}, { collection: 'users', timestamps: true });

module.exports = mongoose.model('User', UserSchema);