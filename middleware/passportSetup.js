const dotenv = require('dotenv')
dotenv.config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { googleConfig } = require('../controllers/o-authController')
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../tokens')

passport.use(
    new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, 
    googleConfig
))