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
const UpdatePost = async (req, res) => {
  try{
    const updatedPost = await Post.findByIdAndUpdate(req.params.post_id, req.body,{
    new: true
    }
)
  res.status(200).send(updatedPost)  
  } catch (error) {
    throw error
  }
}
const DeletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.post_id })
    res.status(200).send({ msg: 'Post Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
}
module.exports = {
  GetPosts,
  CreatePost,
  UpdatePost,
  DeletePost
}