const ErrorHandler = require('../utils/ErrorHandler')
const User = require('../models/User')
const QuizResult = require('../models/QuizResult')

exports.submitQuiz = async (req, res, next) => {
    const { grade, user } = req.body
    const result = await QuizResult.create({
        grade,
        user: user._id
    })
    if (result) {
        const dbUser = await User.findById(result.user._id)
        dbUser.quizResults.push(result)
        try {
            await dbUser.save()
        } catch (err) {
            next(err)
        }
        return res.json({
            message: "success",
            result
        })    
    }
    const err = new ErrorHandler('could not create survey', 500)
    next(err)
}

exports.getResults = async (req, res, next) => {
    const { userId } = req.params
    const user = await User.findById(userId).populate('quizResults')
    console.log(user)
    return res.json(
        user.quizResults
    )
}

exports.removeQuiz = async (req, res, next) => {
    const { quizId } = req.params
    try {
        const quiz = await QuizResult.findById(quizId).populate('user')
        // console.log(quiz)
        // quiz.user.quizResults.filter(quizResult => quizResult !== quizId)
        try {
            await quiz.remove()
        } catch (err) {
            next(err)
        }
    } catch (err) {
        next(err)
    }
    return res.json({
        lol: 'nice'
    })
}