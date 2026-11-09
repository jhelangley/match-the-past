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

class User {
    constructor({ id, username, password, current_score }) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.current_score = current_score;
}
    

    async update(data) {
        const currentScore = data.current_score || this.current_score;
        const response = await db.query(
            'UPDATE users SET current_score = $1 WHERE id = $2 RETURNING *;',
            [currentScore, this.id]
        );

        return new User(response.rows[0]);
        

    
    }

    static async getStudentById(id) {
        const response = await db.query(
            'SELECT * FROM users WHERE id = $1;',
            [id]
        );

        return new User(response.rows[0]);
    }
}


module.exports = { Event, update, getUserById };

