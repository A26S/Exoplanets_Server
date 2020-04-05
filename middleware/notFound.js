const notFound = (req, res, next) => {
    const error = new ErrorHandler('cannot find this url', 404)
    next(error)
}

module.exports = notFound