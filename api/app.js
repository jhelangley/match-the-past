const express = require('express')
const cors = require('cors')
const logger = require('./middleware/logger')

const eventRouter = require('./routers/events')
const userRouter = require('./routers/user')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

app.use('/events', eventRouter)
app.use('/users', userRouter)
module.exports = app;