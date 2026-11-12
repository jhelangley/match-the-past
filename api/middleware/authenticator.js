const jwt = require('jsonwebtoken')

function authenticator(req, res, next){
    const token = req.headers.authorization?.split(" ")[1]

    if (!token){
        return res.status(401).json({ error: 'No token provided' })}
    if (token) {
        jwt.verify(token, process.env.SECRET_TOKEN, async (err, data) => {
            if (err) {
                res.status(403).send({err: 'Invalid token'})
            } else{
                next()
            }
        }) 
    } else {
        res.status(403).send({err: 'Missing token'})
    }   
}

module.exports = authenticator