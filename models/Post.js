const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    postImage: { type: String, required: true },
    postDescription: { type: String },
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
