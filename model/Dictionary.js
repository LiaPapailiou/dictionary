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
    completed: {
        type: Boolean,
        required: true
    },
    user: {
        name: {
            type: String,
            required: true
        },
        socialMedia: {
            type: String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = Dictionary = mongoose.model('Dictionary', dictionarySchema);