const db = require('../api/database/connect')

class Event {
    constructor({ id, title, date, description }) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = description;
    }

    static async getRandom() {
        const response = await db.query(
            'SELECT * FROM event_card ORDER BY date LIMIT 4;'
        );

        return response.rows.map(e => new Event(e));
    }
}

module.exports = Event