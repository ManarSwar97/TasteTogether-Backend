const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/RecipeController')

//API
router.get('/search/recipeName', recipeController.searchRecipes)
router.get('/recipe/:id', recipeController.getRecipeById)
router.get('/random', recipeController.getRandomRecipe)
router.get('/category/:recipeCategory', recipeController.getRecipeByCategory)


//CRUD
router.post('/', recipeController.createRecipe)
router.get('/',recipeController.getAllRecipes)
router.get('/:id',recipeController.getRecipeDB)
router.get('/:id/edit',recipeController.editRecipe)
router.put('/:id',recipeController.updateRecipe)
router.delete('/:id',recipeController.deleteRecipe)


module.exports= router