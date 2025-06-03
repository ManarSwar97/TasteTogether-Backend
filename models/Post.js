const mongoose = require('mongoose');
const { Schema } = mongoose; 

const postSchema = new Schema(
  {
    post_image:{
        type: String,
        required: true,
    },
    post_description: {
        type: String, 
    },
    likes:[{
    type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    user:{
    type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
  }
)

module.exports = postSchema
