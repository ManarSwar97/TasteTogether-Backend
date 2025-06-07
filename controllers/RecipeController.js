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
    const {
      recipeName,
      recipeDescription,
      recipeInstruction,
      recipeIngredient,
      recipeCategory,
      userId
    } = req.body

    const recipeImage = req.file ? req.file.path : null

    const newRecipe = new Recipe({
      recipeName,
      recipeDescription,
      recipeInstruction,
      recipeIngredient,
      recipeCategory,
      recipeImage,
      user: userId
    })

    //save the recipe in the database
    const saveRecipe = await newRecipe.save()
    res.status(201).json(saveRecipe)
  } catch (error) {
    //if theres an error then show this
    res.status(500).json({ error: 'Failed to create recipe' })
  }
}

//get all recipes from the database
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('user', 'username')
    res.json(recipes)
  } catch (error) {
    //if theres an error then show this
    res.status(500).json({ error: 'Failed to fetch all recipes' })
  }
}

//get recipes from the database by id
const getRecipeDB = async (req, res) => {
  try {
    const id = req.params.id
    const recipe = await Recipe.findById(id).populate('user', 'username')
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }
    return res.json(recipe)
  } catch (error) {
    //if theres an error then show this
    res.status(500).json({ error: 'Failed to fetch recipe by Id' })
  }
}

//to edit the recipe
const editRecipe = async (req, res) => {
  try {
    //get the id of the recipe
    const id = req.params.id
    //find the recipe by id
    const recipe = await Recipe.findById(id)

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }
  } catch (error) {
    //if theres an error then show this
    res.status(500).json({ error: 'Failed to fetch recipe for edit' })
  }
}

const updateRecipe = async (req, res) => {
  try {
    //get the id of the recipe
    const id = req.params.id
    const {
      recipeName,
      recipeDescription,
      recipeInstruction,
      recipeIngredient,
      recipeCategory,
      user: userId
    } = req.body
    // find the recipe by id
    const recipe = await Recipe.findById(id)

    //if the recipe not found
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }

    // the new details the user provide
    recipe.recipeName = recipeName
    recipe.recipeDescription = recipeDescription
    recipe.recipeInstruction = recipeInstruction
    recipe.recipeIngredient = recipeIngredient
    recipe.recipeCategory = recipeCategory
    recipe.recipeImage = req.file ? req.file.path : recipe.recipeImage
    recipe.user = userId

    //save it in the database
    const updatedRecipe = await recipe.save()
    res.json(updatedRecipe)
  } catch (error) {
    //if theres an error then show this
    res.status(500).json({ error: 'Failed to update recipe' })
  }
}

//delete the recipe
const deleteRecipe = async (req, res) => {
  try {
    //to get the id
    const id = req.params.id
    const deleteRecipe = await Recipe.findByIdAndDelete(id)
    if (!deleteRecipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }
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
  editRecipe,
  deleteRecipe,
  updateRecipe
}
