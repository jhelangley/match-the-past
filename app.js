const express = require('express');
const cors = require('cors');

const { eventRouter } = require('./routers/events');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/events', eventRouter);

module.exports = app;