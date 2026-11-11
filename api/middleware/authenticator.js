const jwt = require('jsonwebtoken')

function authenticator(req, res, next){
    const token = req.headers.authorization

    if (!token){
        return res.status(401).json({ error: 'No token provided' })
        
        jwt.verify(token, process.env.SECRET_TOKEN, async (err, data) => {
            if (err) {
                return res.status(403).send({err: 'Invalid token'})
            }else{
            next()
            }
    })
} else {
    res.status(403).send({err: 'Missing token'})
}
}

module.exports = authenticator