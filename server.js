const express = require('express')
const logger = require('morgan')

const AuthRouter = require('./routes/AuthRouter')
const PORT = process.env.PORT || 3001

const db = require('./db')

const app = express()

// ✅ Apply middleware BEFORE the routes
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ✅ Routes come after middleware
app.use('/auth', AuthRouter)

app.use('/', (req, res) => {
  res.send(`Connected!`)
})

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
