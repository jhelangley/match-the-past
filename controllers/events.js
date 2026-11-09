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



async function updateScore(req, res) {
    try {
        const id = req.params.id
        const data = req.body;
        const user = await User.getStudentById(id);
        const updatedUser = await user.update(data);

        res.status(200).json(updatedUser);

    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

module.exports = { random, updateScore };