const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = Schema({
    username: {
        type: String,
        unique: true 
    },
    password: {
        type: String
    },
    googleId: {
        type: String
    },
    displayName: {
        type: String
    },
    quizResults: [{
        type: Schema.Types.ObjectId,
        ref: 'QuizResult'
    }]
})

const User = mongoose.model('User', userSchema)

module.exports = User