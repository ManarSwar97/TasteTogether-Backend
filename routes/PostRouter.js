const controller = require('../controllers/PostController')
const middleware = require('../middleware')
const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
router.get('/', controller.GetPosts)
router.post('/', 
    middleware.stripToken, 
    middleware.verifyToken, 
    upload.single('postImage'),
    controller.CreatePost,
    
)
router.put('/:post_id',
  middleware.stripToken,
  middleware.verifyToken,
  upload.single('postImage'),
  controller.UpdatePost
)
router.delete(
  '/:post_id',
  middleware.stripToken,
  middleware.verifyToken,
  upload.single('postImage'),
  controller.DeletePost
)
router.post('/:post_id/like',
  middleware.stripToken,
  middleware.verifyToken,
  controller.LikePost
)
module.exports = router