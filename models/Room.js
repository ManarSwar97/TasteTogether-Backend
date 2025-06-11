const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema(
  {
    roomId: { type: String, required: true, unique: true },
    roomName: { type: String, required: true },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Room', RoomSchema)
