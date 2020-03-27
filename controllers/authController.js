const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const ErrorHandler = require('../utils/ErrorHandler')
const User = require('../models/User')

exports.signup = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .exec()
        .then(user => {
            if (user) {
                const error = new ErrorHandler('username already taken', 409)
                next(error)
            } else {
                bcrypt.hash(req.body.password, 10, (err, securePassword) => {
                    if (err) {
                        const error = new ErrorHandler('issue with bcrypt', 500)
                        next(error)
                    } else {
                        const user = new User({
                            username: req.body.username,
                            password: securePassword,
                            displayName: req.body.nickname
                        })
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    user: result,
                                    message: 'user created'
                                })
                            })
                            .catch(err => {
                                const error = new ErrorHandler('MongoDB could not create this user', 500)
                                next(error)
                            })
                        //
                    }

                })
            }
        })
    //
}

exports.login = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .exec()
        .then(user => {
            if (!user) {
                const error = new ErrorHandler('username doesnt exist', 400)
                next(error)
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        const error = new ErrorHandler('issue with bcrypt', 500)
                        next(error)
                    } else if (!result) {
                        const error = new ErrorHandler('incorrect password', 401)
                        next(error)
                    } else {
                        const token = jwt.sign({ 
                            id: user.id 
                        }, 
                        process.env.JWT_KEY, { 
                            expiresIn: process.env.JWT_EXP
                        })
                        return res.status(200).json({
                            message: 'logging you in ...',
                            user,
                            token
                        })
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    //
}

exports.serveUser = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
        if (err) {
            return next(new ErrorHandler('no token', 401))
        }
        return decodedToken.id
    })
    const user = await User.findById(decoded)
    res.status(200).json({
        user
    })
}