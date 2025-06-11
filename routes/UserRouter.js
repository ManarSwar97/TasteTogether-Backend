const router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')
const upload = require('../middleware/multer')

// get all users
router.get('/', controller.GetAllUsers)

// get one user profile and posts
router.get('/:user_id', controller.GetUserProfile)

// PUT route for updating profile
router.put(
  '/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  upload.single('profileImage'),
  controller.UpdateUserProfile
)

module.exports = router
