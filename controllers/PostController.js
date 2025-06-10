const { Post } = require('../models')
// const GetPosts = async (req, res) => {
//   try {
//     const posts = await Post.find({}) //get all the post without filter
//     res.send(posts) //send all posts
//   } catch (error) {
//     throw error
//   }
// }

const GetPosts = async (req, res) => {
  try {
    // Get user ID from query
    const userId = req.query.user

    let posts //define post
    if (userId) {
      // If userId exists, find posts for that user
      posts = await Post.find({ user: userId })
    } else {
      // Otherwise, find all posts
      posts = await Post.find({})
    }
    res.status(200).json(posts) // Send posts
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
  try {
    const updateFields = {
      postImage: req.file.filename,
      postDescription: req.file.postDescription
    }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.post_id,
      updateFields,
      {
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
    res
      .status(200)
      .send({ msg: 'Post Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
}

const LikePost = async (req, res) => {
  try {
    const userId = res.locals.payload.id
    const post = await Post.findById(req.params.post_id)
    const alreadyLiked = post.likes.some((id) => id.toString() === userId)
    if (!alreadyLiked) {
      post.likes.push(userId)
      await post.save()
    }
    res.send(String(post.likes.length))
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

module.exports = {
  GetPosts,
  CreatePost,
  UpdatePost,
  DeletePost,
  LikePost
}
