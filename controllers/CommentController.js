const { Comment } = require('../models')
const GetComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).populate('user')
    res.status(200).send(comments)  
} catch (error) {
    throw error
  }
}
const CreateComment = async (req, res) => {
  try {
    const userId = res.locals.payload.id
    const postId = req.body.postId;

    const postComment = {
      comment: req.body.comment,    
      user: userId,
      post: postId
    }
      const newComment = await Comment.create(postComment)
      res.status(200).send(newComment)  

  } catch (error) {
    throw error
  }
}
const GetCommentsByPost = async(req, res) =>{
  try{
  const postId = req.params.postId
  const comments = await Comment.find({post: postId}).populate('user')
  res.status(200).send(comments);  
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch comments for the post' });
  }
}


module.exports = {
  GetComments,
  CreateComment,
  GetCommentsByPost
}