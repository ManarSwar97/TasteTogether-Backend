const axios = require('axios')
const Recipe = require('../models/recipe')

//to search meal by name :
const searchRecipes = async (req, res) => {
  try {
    const recipeName = req.params.recipeName
    //axios call for the api
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`
    )
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes by name' })
  }
}

const getAllAPIRecipes = async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/search.php?s='
    )
    // Send the meals array from the API response
    res.json(response.data.meals)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch recipes from TheMealDB' })
  }
}

//to get one recipe by id:
const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id
    //axios  call for the api
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
    )
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes by Id' })
  }
}

//the special feature for selecting a random recipe
const getRandomRecipe = async (req, res) => {
  try {
    //axios call for random recipe api
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/random.php`
    )
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch random recipes' })
  }
}

//filter by category
const getRecipeByCategory = async (req, res) => {
  try {
    const recipeCategory = req.params.recipeCategory
    //axios call for recipes category api
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${recipeCategory}`
    )
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes by category' })
  }
}

//CRUD For the user to add recipe
//to create the recipe and then save it in the database
const createRecipe = async (req, res) => {
  try {
    const userId = res.locals.payload.id || res.locals.payload._id
    const recipeData = {
      user: userId,

      recipeName: req.body.recipeName,

      recipeImage: req.file.filename,

      recipeDescription: req.body.recipeDescription,

      recipeInstruction: req.body.recipeInstruction,

      recipeIngredient: req.body.recipeIngredient,

      recipeCategory: req.body.recipeCategory
    }
    const recipe = await Recipe.create(recipeData)
    res.status(201).json(recipe)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create recipe' })
  }
}


//get all recipes from the database
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({})
    //it will take the username and image.
    res.status(200).send(recipes)
  } catch (error) {
    //if theres an error then show this
    res.status(500).json({ error: 'Failed to fetch all recipes' })
  }
}

//get recipes from the database by id
const getRecipeDB = async (req, res) => {
  try {
    const id = req.params.recipe_id
    const recipe = await Recipe.findById(id).populate('user', 'username image')
    //if the recipe not exist in the database return error message
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }
    return res.json(recipe) //if its there return it
  } catch (error) {
    //if theres an error then show this
    res.status(500).json({ error: 'Failed to fetch recipe by Id' })
  }
}

//for edit and update the recipe
const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipe_id
    const userId = res.locals.payload.id
    const updateData = { ...req.body }
    //take everything was in the form and if i update any field save it in the updated data
    const recipe = await Recipe.findById(recipeId) //find the recipe by id
    if (recipe.user.toString() !== userId) {
      return res
        .status(403)
        .json({ error: 'You are not authorized to update this recipe.' })
    }
    // Check if a new image was uploaded
    if (req.file) {
      updateData.recipeImage = req.file.filename
    }
    //to update the recipe and save it in the database
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, updateData, {
      new: true
    })

    res.status(200).json(updatedRecipe)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update recipe' })
  }
}

//delete the recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipe_id
    const userId = res.locals.payload.id

    const recipe = await Recipe.findById(recipeId)
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }

    if (recipe.user.toString() !== userId) {
      return res
        .status(403)
        .json({ error: 'You are not authorized to delete this recipe.' })
    }

    await Recipe.deleteOne({ _id: recipeId })
    res.status(200).send({
      msg: 'Recipe Deleted',
      payload: recipeId,
      status: 'Ok'
    })
  } catch (error) {
    //if theres an error then show this
    res.status(500).json({ error: 'Failed to delete recipe' })
  }
}

module.exports = {
  searchRecipes,
  getRecipeById,
  getRandomRecipe,
  getRecipeByCategory,
  createRecipe,
  getAllRecipes,
  getAllAPIRecipes,
  getRecipeDB,
  deleteRecipe,
  updateRecipe
}
