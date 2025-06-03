const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    post_image: { type: String, required: true },
    post_description: { type: String },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
