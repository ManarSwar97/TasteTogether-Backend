const { Schema } = require('mongoose')

const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
    type_of_food:{
        type:[String], 
        required: true
    }
  },
  { timestamps: true }
)

module.exports = userSchema
