const router = require('express').Router()

const { submitQuiz, getResults, removeQuiz } = require('../controllers/quizController')

router.post('/submit', submitQuiz)

router.get('/:userId', getResults)

router.get('/remove/:quizId', removeQuiz)

module.exports = router