const controller = require('../controllers/PostController')
const middleware = require('../middleware')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })
router.get('/', controller.GetPosts)
router.post('/', 
    middleware.stripToken, 
    middleware.verifyToken, 
    upload.single('postImage'),
    controller.CreatePost,
    
)

module.exports = router