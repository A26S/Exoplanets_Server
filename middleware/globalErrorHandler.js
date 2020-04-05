const globalErrorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(err.status || 500)
    res.json({
        message: err.message || 'unknown error occured'
    })
}

module.exports = globalErrorHandler