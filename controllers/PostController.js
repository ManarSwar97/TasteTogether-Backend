const { Post } = require('../models')
const GetPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
    res.send(posts)
  } catch (error) {
    throw error
  }
}

const CreatePost = async (req, res) => {
  try {
    const userId = res.locals.payload.id || res.locals.payload._id
    const postData = {
      user: userId,
      postImage: req.file.filename,
      postDescription: req.body.postDescription
    }
      const post = await Post.create(postData)
      res.status(201).json(post)

  } catch (error) {
    throw error
  }
}

module.exports = {
  GetPosts,
  CreatePost,
}