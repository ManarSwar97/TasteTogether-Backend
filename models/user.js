const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String},
    username: { type: String},
    email: { type: String},
    password: { type: String},
    image: { type: String },
    type_of_food: {
      type: [String],
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema) // ✅ Export the model directly
