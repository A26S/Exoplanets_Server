const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const ErrorHandler = require('../utils/ErrorHandler')
const User = require('../models/User')

exports.signup = async (req, res, next) => {
    const foundUser = await User.findOne({ username: req.body.username })
    if (foundUser) {
        const error = new ErrorHandler('username already taken', 409)
        return next(error)
    }
    bcrypt.hash(req.body.password, 10, async (err, securePassword) => {
        if (err) {
            const error = new ErrorHandler('issue with bcrypt', 500)
            return next(error)
        } 
        const user = await User.create({
            username: req.body.username,
            password: securePassword,
            displayName: req.body.nickname
        })
        return res.status(201).json({
            user,
            message: 'user created'
        })
    })
}

exports.login = async (req, res, next) => {
    const enteredUser = await User.findOne({ username: req.body.username })
    if (!enteredUser) {
        const error = new ErrorHandler('username doesnt exist', 400)
        return next(error)
    } 
    bcrypt.compare(req.body.password, enteredUser.password, async (err, result) => {
        if (err) {
            const error = new ErrorHandler('issue with bcrypt', 500)
            return next(error)
        } else if (!result) {
            const error = new ErrorHandler('incorrect password', 401)
            return next(error)
        } 
        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { 
            expiresIn: process.env.JWT_EXP
        })
        return res.status(200).json({
            message: 'logging you in ...',
            user,
            token
        })
    })
}

exports.serveUser = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
        if (err) {
            const error = new ErrorHandler('no token', 401)
            return next(error)
        }
        return decodedToken.id
    })
    const user = await User.findById(decoded)
    return res.status(200).json({
        user
    })
}