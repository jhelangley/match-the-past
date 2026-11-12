const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

async function register(req, res){
    try{
        const data = req.body
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))
        data.password = await bcrypt.hash(data.password, salt)
        const result = await User.create(data)
        res.status(201).send(result) // data?
    } catch(err){
        res.status(400).json({ error: err.message })
    }
}

async function login(req, res){
    const data = req.body
    try {
        const user = await User.getOneByUsername(data.username)
        if(!user){
            throw new Error("No user with this username")
        }
        const match = await bcrypt.compare(data.password, user.password)
        if (match){
            const isAdmin = data.role
            if (isAdmin != user.is_admin){
                throw new Error("Incorrect account type")
            }
            const payload = {username: user.name}
            const sendToken = (err, token)=>{
                if (err){
                    throw new Error('Error in token generation')
                }


                res.status(200).json({success: true, token: token})
            }
            jwt.sign(payload, process.env.SECRET_TOKEN, {expiresIn: 3600}, sendToken)
        } else {
            throw new Error('User could not be authenticated')
        }
    } catch (err){
        res.status(401).json({ error: err.message })
    }
}


async function updateScore(req, res) {
    try {
        const username = req.params.username;
        const score = req.params.score;
        const user = await User.getOneByUsername(username)
        const updatedUser = await user.update(score)

        res.status(200).json(updatedUser)

    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

async function retrieveScore(req,res) {
    try {
        const username = req.params.username;
        const user = await User.getOneByUsername(username)
        const score = user.current_score

        res.status(200).json(score)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

module.exports = { register, login, updateScore, retrieveScore }