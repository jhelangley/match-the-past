const bcrypt = require('bcrypt')
const jt = require('jsonwebtoken')
const User = require('../models/User')

async function register