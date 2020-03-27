const express = require('express')
const ErrorHandler = require('./utils/ErrorHandler')
const authRoutes = require('./routes/authRoutes')
const quizRoutes = require('./routes/quizRoutes')
const accessControl = require('./middleware/accessControl')

const app = express()
app.use(express.json())

// middleware
app.use(accessControl)

// routes
app.use('/auth', authRoutes)
app.use('/quiz', quizRoutes)

// Error Handling
app.use((req, res, next) => {
    const error = new ErrorHandler('cannot find this url', 404)
    next(error)
})

app.use((err, req, res, next) => {
    if (res.headersSent) {
        next(err)
    }
    res.status(err.status || 500)
    res.json({
        message: err.message || 'unknown error occured'
    })
})

module.exports = app