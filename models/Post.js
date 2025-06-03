const { Schema } = require('mongoose')

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
        type: mongoose.schema.Types.ObjectId,
        ref: 'User',
    }],
    user:{
        type: mongoose.schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
  }
)

module.exports = postSchema
