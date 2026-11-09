const { Router } = require('express');

const eventController = require('../controllers/events');

const eventRouter = Router();
const studentRouter = Router();

eventRouter.get('/random', eventController.random);
studentRouter.put('/:id', eventController.updateScore);


module.exports = { eventRouter, studentRouter };

