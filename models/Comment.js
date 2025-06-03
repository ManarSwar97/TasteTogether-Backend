const mongoose = require('mongoose');
const { Schema } = mongoose; 

const commentSchema = new Schema(
  {
    comment:{
        type: String,
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    }
  }
)

module.exports = commentSchema
