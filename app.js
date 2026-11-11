const express = require('express')
const cors = require('cors')
const logger = require('./middleware/logger')

const eventRouter = require('./routers/events')
const studentRouter = require('./routers/user')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

app.use('/events', eventRouter)
app.use('/students', studentRouter)
module.exports = app;