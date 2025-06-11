const router = require('express').Router()
const controller = require('../controllers/RoomController')
const middleware = require('../middleware')

router.post(
  '/create',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateRoom
)

router.get('/', controller.GetRooms)

router.get(
  '/join/:roomId',
  middleware.stripToken,
  middleware.verifyToken,
  controller.JoinRoom
)

router.put(
  '/:roomId/status',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateRoomStatus
)

module.exports = router
