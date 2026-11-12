const db = require('../database/connect')

class User {

    constructor({ user_id, username, password, is_admin, current_score}){
        this.id = user_id;
        this.username = username;
        this.password = password;
        this.is_admin = is_admin;
        this.current_score = current_score;
    }

    static async getOneByUsername(username){
        const response = await db.query("SELECT * FROM user_table WHERE username = $1", [username])
        if (response.rows.length != 1){
            throw new Error(`Unable to locate ${username}`)
        }
        return new User(response.rows[0])
    }

    static async getOneById(id){
        const response = await db.query("SELECT * FROM user_table WHERE user_id = $1", [id])
        if (response.rows.length != 1){
            throw new Error("Unable to locate user.")
        }
        return new User(response.rows[0])
    }

    static async create(data){
        const { username, password, is_admin } = data
        const response = await db.query("INSERT INTO user_table (username, password, is_admin) VALUES ($1, $2, $3) RETURNING user_id;", [username, password, is_admin])
        const newId = response.rows[0].user_id
        const newUser = await User.getOneById(newId)
        return newUser
    }

    async update(data) {
        const currentScore = data.current_score
        const response = await db.query(
            'UPDATE user_table SET current_score = $1 WHERE user_id = $2 RETURNING *;',
            [currentScore, this.id]
        );

        return new User(response.rows[0])
    
    }

}
module.exports = User
