const mongoose = require('mongoose');

const dictionarySchema = new mongoose.Schema({
  definition: {
    type: String,
    required: true,
  },
  termType: {
    type: String,
  },
  phoneticSpelling: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userSocialMedia: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Dictionary = mongoose.model('Dictionary', dictionarySchema);
module.exports = Dictionary;
