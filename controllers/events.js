const Event = require('../models/Event');

async function random(req, res) {
    try {
        const events = await Event.getRandom();

        res.status(200).json(events);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

module.exports = { random };