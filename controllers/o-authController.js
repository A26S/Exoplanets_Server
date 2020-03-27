const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.googleConfig = async (accessToken, refreshToken, profile, next) => {
    const currentUser = await User.findOne({ googleId: profile.id })
    if (currentUser) {
        return next(null, currentUser)
    } 
    const newUser = await User.create({
        googleId: profile.id,
        displayName: profile.name.givenName
    })
    next(null, newUser)
}

exports.authorizeUser = (req, res, next) => {
    const token = jwt.sign({
        id: req.user.id
    },
        process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXP
    })
    res.status(200).json({
        message: 'google success',
        token,
        user: req.user
    })
    next()
} 