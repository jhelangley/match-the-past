const { Router } = require('express');

const eventController = require('../controllers/events');

const eventRouter = Router();

eventRouter.get('/random', eventController.random);

module.exports = eventRouter;