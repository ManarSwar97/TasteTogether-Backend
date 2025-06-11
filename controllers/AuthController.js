const { User } = require('../models')
const middleware = require('../middleware')
const Register = async (req, res) => {
  try {
    const {
      password,
      username,
      firstName,
      lastName,
      email,
      typeOfFood,
      confirmPassword
    } = req.body

    if (password !== confirmPassword) {
      return res
        .status(400)
        .send({ msg: 'Password and confirm password do not match!' })
    }

    let existingUser = await User.findOne({ username })
    if (existingUser) {
      return res
        .status(400)
        .send({ msg: 'A user with that username has already been registered!' })
    }

    let passwordDigest = await middleware.hashPassword(password)

    let image = req.file ? req.file.filename : null

    const user = await User.create({
      passwordDigest,
      username,
      firstName,
      lastName,
      email,
      image,
      typeOfFood
    })

    res.send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      msg: 'An error has occurred registering the user!'
    })
  }
}


const Login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).send({ status: 'Error', msg: 'Invalid username' })
    }
    let matched = await middleware.comparePassword(
      password,
      user.passwordDigest
    )
    
    if (!matched) {
      return res.status(401).send({ status: 'Error', msg: 'Invalid password' })
    }
    
    if (matched) {
      let payload = {
        id: user._id,
        username: user.username,
        image: user.image
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res
      .status(401)
      .send({ status: 'Error', msg: 'An error has occurred logging in!' })
  }
}

const CheckSession = async (req, res) => {
  try {
    //get the user info stored in locals (from middleware)
    const userPayload = res.locals.payload
    //send the user info
    res.status(200).json(userPayload)
  } catch (error) {
    res.status(401).send({ status: 'Error', msg: 'Invalid session' })
  }
}

module.exports = {
  Register,
  Login,
  CheckSession
}
