const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true},
    username: { type: String, required: true},
    email: { type: String, required: true},
    passwordDigest: { type: String, required: true},
    image: { type: String },
    type_of_food: {
      type: [String],
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema) // ✅ Export the model directly
