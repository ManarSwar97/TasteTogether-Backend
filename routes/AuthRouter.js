const router = require('express').Router()
const controller = require('../controllers/AuthController')
const middleware = require('../middleware')
const upload = require('../middleware/multer')

router.post('/login', controller.Login)
router.post('/register', upload.single('profileImage'), controller.Register)
// router.put(
//   '/update/:user_id',
//   middleware.stripToken,
//   middleware.verifyToken,
//   controller.UpdatePassword
// )
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

module.exports = router
