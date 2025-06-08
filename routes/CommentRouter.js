const controller = require('../controllers/CommentController')
const middleware = require('../middleware')
const express = require('express')
const router = express.Router()
router.get('/', controller.GetComments)
router.post('/', 
    middleware.stripToken, 
    middleware.verifyToken, 
    controller.CreateComment
    
)
router.get('/:postId',
    middleware.stripToken, 
    middleware.verifyToken, 
    controller.GetCommentsByPost
)
module.exports = router