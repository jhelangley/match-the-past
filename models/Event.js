const db = require('../db/connect');

class Event {
    constructor({ id, title, date, description }) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = description;
    }

    static async getRandom() {
        const response = await db.query(
            'SELECT * FROM event_cards ORDER BY RANDOM() LIMIT 3;'
        );

        return response.rows.map(e => new Event(e));
    }
}

module.exports = Event;

