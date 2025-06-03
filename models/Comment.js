const { Schema } = require('mongoose')

const commentSchema = new Schema(
  {
    comment:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.schema.Types.ObjectId,
        ref: 'User',
    },
    post:{
        type: mongoose.schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    }
  }
)

module.exports = commentSchema
