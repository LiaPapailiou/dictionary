const mongoose = require('mongoose');

const dictionarySchema = new mongoose.Schema({
    definition: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userSocialMedia: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Dictionary = mongoose.model('Dictionary', dictionarySchema);