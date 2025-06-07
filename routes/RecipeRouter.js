const recipeController = require('../controllers/RecipeController')
const middleware = require('../middleware')
const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')

// API
router.get('/search/:recipeName', recipeController.searchRecipes)
router.get('/:id', recipeController.getRecipeById)
router.get('/random', recipeController.getRandomRecipe)
router.get('/category/:recipeCategory', recipeController.getRecipeByCategory)
router.get('/', recipeController.getAllAPIRecipes)

// // CRUD
// router.post(
//   '/',
//   middleware.verifyToken,
//   upload.single('recipeImage'),
//   recipeController.createRecipe
// )
// // router.get('/', recipeController.getAllRecipes)
// router.get('/:id', recipeController.getRecipeDB)
// router.get('/:id/edit', middleware.verifyToken, recipeController.editRecipe)
// router.put(
//   '/:id',
//   middleware.verifyToken,
//   upload.single('recipeImage'),
//   recipeController.updateRecipe
// )
// router.delete('/:id', middleware.verifyToken, recipeController.deleteRecipe)

module.exports = router
