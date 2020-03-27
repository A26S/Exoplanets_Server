const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const router = express.Router()

const { signup, login, serveUser } = require('../controllers/authController')
const authenticateToken = require('../middleware/authenticateToken')
const { authorizeUser, googleConfig } = require('../controllers/o-authController')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')

passport.use(
    new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, googleConfig )
)

router.post('/signup', signup)

router.post('/login', login)

router.get('/google', passport.authenticate('google', {
    session: false,
    scope: ['profile']
}), )

router.get('/google/redirect', passport.authenticate('google', {
    session: false
}), (req, res) => {
    res.redirect('../../')
})

router.get('/current_user', serveUser )

module.exports = router