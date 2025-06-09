const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    recipeName: { type: String, required: true },
    recipeDescription: { type: String, required: true },
    recipeInstruction: { type: String, required: true },
    recipeIngredient: { type: String, required: true },
    recipeCategory: { type: String, required: true },
    recipeImage: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Recipe', recipeSchema)
