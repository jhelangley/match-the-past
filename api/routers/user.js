const { Router } = require('express')

const userController = require('../controllers/user')

const studentRouter = Router()

studentRouter.put('/:username', userController.updateScore)

module.exports =  studentRouter