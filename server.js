const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')

const AuthRouter = require('./routes/AuthRouter')
const PostRouter = require('./routes/PostRouter')
const RecipeRouter = require('./routes/RecipeRouter')
const commentRouter = require('./routes/CommentRouter')
const UserRouter = require('./routes/UserRouter')
const RoomRouter = require('./routes/RoomRouter')
const PORT = process.env.PORT || 3001

const db = require('./db')

const app = express()
const server = http.createServer(app) // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins or specify your frontend
    methods: ['GET', 'POST']
  }
})

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/auth', AuthRouter)
app.use('/posts', PostRouter)
app.use('/recipe', RecipeRouter)
app.use('/comments', commentRouter)
app.use('/users', UserRouter)
app.use('/room', RoomRouter)
app.use('/', (req, res) => {
  res.send(`Connected!`)
})

const rooms = {}

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on('join-room', ({ roomId, username, image }) => {
    socket.join(roomId)
    console.log(`User ${socket.id} joined room ${roomId}`)
    socket.roomId = roomId

    if (!rooms[roomId]) rooms[roomId] = []

    rooms[roomId].push({ id: socket.id, username, image })

    const otherUsers = rooms[roomId].filter((u) => u.id !== socket.id)
    socket.emit('all-users', otherUsers)

    socket.to(roomId).emit('user-joined', { id: socket.id, username, image })
  })

  socket.on('signal', ({ to, signal }) => {
    io.to(to).emit('signal', { from: socket.id, signal })
  })

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
    const roomId = socket.roomId
    if (roomId && rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter((u) => u.id !== socket.id)

      socket.to(roomId).emit('user-disconnected', socket.id)

      if (rooms[roomId].length === 0) {
        delete rooms[roomId]
        console.log(`Room ${roomId} deleted as empty`)
      }
    }
  })
})

server.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
