const dotenv = require('dotenv')
dotenv.config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { googleConfig } = require('../controllers/o-authController')

passport.use(
    new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, 
    googleConfig
))