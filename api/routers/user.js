const { Router } = require('express')
const { authenticator } = require('../middleware/authenticator')

const userController = require('../controllers/user')

const userRouter = Router()

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)

userRouter.put('/:username/:score', authenticator, userController.updateScore)

module.exports =  userRouter
