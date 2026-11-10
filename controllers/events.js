const Event = require('../models/Event')

async function random(req, res) {
    try {
        const level = parseInt(req.params.level)
        const events = await Event.getRandom(level)

        res.status(200).json(events)

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}



module.exports = { random }