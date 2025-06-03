const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true},
    username: { type: String, required: true},
    email: { type: String, required: true},
    passwordDigest: { type: String, required: true},
    image: { type: String },
    typeOfFood: {
      type: [String],
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
