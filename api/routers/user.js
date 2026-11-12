const { Router } = require('express')
const { authenticator } = require('../middleware/authenticator')

const userController = require('../controllers/user')

const userRouter = Router()

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)
userRouter.get('/:username', userController.retrieveScore)
userRouter.put('/:username/:score', authenticator, userController.updateScore)

userRouter.get('/students', authenticator, userController.getAllStudents)

module.exports =  userRouter
