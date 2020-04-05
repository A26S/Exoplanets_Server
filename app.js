const express = require('express')

const authRoutes = require('./routes/authRoutes')
const quizRoutes = require('./routes/quizRoutes')
const accessControl = require('./middleware/accessControl')
const notFound = require('./middleware/notFound')
const globalErrorHandler = require('./middleware/globalErrorHandler')

const app = express()
app.use(express.json())

// middleware
app.use(accessControl)

// routes
app.use('/auth', authRoutes)
app.use('/quiz', quizRoutes)

// Error Handling
app.use(notFound)
app.use(globalErrorHandler)

module.exports = app