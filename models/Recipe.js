const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    recipe_name: { type: String, required: true },
    recipe_description: { type: String, required: true },
    recipe_instruction: { type: String, required: true },
    recipe_ingredient: { type: String, required: true },
    recipe_category: { type: [String], required: true },
    recipe_image: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Recipe', recipeSchema)
