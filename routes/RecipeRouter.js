const recipeController = require('../controllers/RecipeController')
const middleware = require('../middleware')
const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')

// CRUD
router.post(
  '/db',
  middleware.stripToken,
  middleware.verifyToken,
  upload.single('recipeImage'),
  recipeController.createRecipe
)
router.get('/db', recipeController.getAllRecipes)

router.get('/db/:recipe_id', recipeController.getRecipeDB)

router.put(
  '/db/:recipe_id',
  middleware.stripToken,
  middleware.verifyToken,
  upload.single('recipeImage'),
  recipeController.updateRecipe
)
router.delete(
  '/db/:recipe_id',
  middleware.stripToken,
  middleware.verifyToken,
  upload.single('recipeImage'),
  recipeController.deleteRecipe
)

// API
router.get('/search/:recipeName', recipeController.searchRecipes)
router.get('/random', recipeController.getRandomRecipe)
router.get('/:id', recipeController.getRecipeById)
router.get('/category/:recipeCategory', recipeController.getRecipeByCategory)
router.get('/', recipeController.getAllAPIRecipes)

module.exports = router
