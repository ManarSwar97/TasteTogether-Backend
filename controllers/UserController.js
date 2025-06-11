const { User, Post } = require('../models')

const GetUserProfile = async (req, res) => {
  try {
    //get the user ID from URL param
    const userId = req.params.user_id
    //find the user bt ID, excluding the password since its a sensitive information
    const user = await User.findById(userId).select('-passwordDigest')

    //if there is no user found return 404
    if (!user) return res.status(404).send({ msg: 'User not found' })

    //find all posts created by this user , order the newest first using sort()
    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 })

    //send tbe user data and posts
    res.send({ user, posts })
  } catch (error) {
    res.status(500).send({ msg: 'Error fetching user profile' })
  }
}

const GetAllUsers = async (req, res) => {
  try {
    //find all users in the database
    //use select to only include username,fname,lname,image
    const users = await User.find().select('username firstName lastName image')

    //send the list of users
    res.send(users)
  } catch (error) {
    res.status(500).send({ msg: 'Error fetching users' })
  }
}

const UpdateUserProfile = async (req, res) => {
  try {
    //get the user ID from URL param
    const userId = req.params.user_id
    //take the updated profile fields from req body
    const { firstName, lastName, email, typeOfFood } = req.body

    // handle image upload if provided
    let image = req.file ? req.file.filename : undefined

    //updated fields
    const updateFields = {
      firstName,
      lastName,
      email,
      typeOfFood
    }
    //if there was uploaded image
    if (image) updateFields.image = image
    //find user by id and update (without password field (more secure))
    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
      select: '-passwordDigest' //exclude the password
    })

    //if no user found with that id, send 404
    if (!updatedUser) {
      return res.status(404).send({ msg: 'User not found' })
    }
    //send the updated data as a response
    res.send(updatedUser)
  } catch (error) {
    res.status(500).send({ msg: 'Error updating profile' })
  }
}

module.exports = {
  GetUserProfile,
  GetAllUsers,
  UpdateUserProfile
}
