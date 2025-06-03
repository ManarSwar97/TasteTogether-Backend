const { Schema } = require('mongoose')

const recipeSchema = new Schema(
{
    recipe_name:{
        type: String,
        required: true,
    },
    recipe_description: {
        type: String, 
        required: true,
    },
    recipe_instruction: {
        type: String, 
        required: true,
    },
    recipe_ingredient: {
        type: String, 
        required: true,
    },
    recipe_category: {
        type: [String], 
        required: true,
    },
    recipe_image: {
        type: String, 
        required: true,
    },
    user:{
        type: mongoose.schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
  }
)

module.exports = recipeSchema
