const dotenv = require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        res.status(200).json({
            decoded,
            message: 'authorized'
        })
        next()
    } catch (err) {
        res.status(401).json({
            error: err,
            message: 'could not verify token'
        })
    }
}

module.exports = authenticateToken