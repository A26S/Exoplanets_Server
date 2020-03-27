const mongoose = require('mongoose')
const { Schema } = mongoose

const quizResultSchema = Schema({
    grade: {
        type: Number,
        required: true
    },
    timeTaken: {
        type: Number,
        // required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    }
})

const QuizResult = mongoose.model('QuizResult', quizResultSchema)

module.exports = QuizResult