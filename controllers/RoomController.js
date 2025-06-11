const Room = require('../models/Room')
const { v4: uuidv4 } = require('uuid')

const CreateRoom = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const { roomName, description } = req.body

    if (!roomName || roomName.trim() === '') {
      return res.status(400).send({ msg: 'Room name is required' })
    }

    const roomId = uuidv4()

    const newRoom = await Room.create({
      roomId,
      roomName,
      description,
      createdBy: id,
      participants: [id]
    })

    res.status(201).send({
      roomId: newRoom.roomId,
      roomName: newRoom.roomName,
      description: newRoom.description
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Error creating video room' })
  }
}

const GetRooms = async (req, res) => {
  try {
    const rooms = await Room.find(
      {},
      'roomId roomName description isActive createdBy'
    )
    res.status(200).send({ rooms })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Error fetching rooms' })
  }
}

const JoinRoom = async (req, res) => {
  try {
    const { roomId } = req.params

    const room = await Room.findOne({ roomId })
    if (!room) {
      return res.status(404).send({ msg: 'Room not found' })
    }
    res.status(200).send({
      msg: 'Room found',
      roomId: room.roomId,
      roomName: room.roomName,
      description: room.description,
      createdBy: room.createdBy
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Error joining room' })
  }
}

const UpdateRoomStatus = async (req, res) => {
  try {
    const { roomId } = req.params
    const { isActive } = req.body
    const { id: userId } = res.locals.payload

    const updatedRoom = await Room.findOneAndUpdate(
      { roomId, createdBy: userId },
      { isActive },
      { new: true }
    )

    if (!updatedRoom) {
      return res.status(404).send({
        msg: 'Room not found or you are not authorized to update this room'
      })
    }

    console.log('Room after update:', updatedRoom)

    res.status(200).send({ msg: 'Room status updated', room: updatedRoom })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: 'Error updating room status' })
  }
}

module.exports = {
  CreateRoom,
  GetRooms,
  JoinRoom,
  UpdateRoomStatus
}
