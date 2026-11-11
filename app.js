const express = require('express')
const cors = require('cors')
const logger = require('./api/middleware/logger')

const eventRouter = require('./api/routers/events')
const userRouter = require('./api/routers/user')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

app.use('/events', eventRouter)
app.use('/users', userRouter)
module.exports = app;