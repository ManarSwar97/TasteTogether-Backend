const mongoose = require('mongoose')
const userSchema = require('../User')
const postSchema = require('../Post')
const commentSchema = require('../Comment')
const recipeSchema = require('../Recipe')


const User = mongoose.model('User', userSchema)
const Post = mongoose.model('Post', postSchema)
const Comment = mongoose.model('Comment', commentSchema)
const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = {
  User,
  Post,
  Comment,
  Recipe
}
