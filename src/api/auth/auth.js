const verifyUser = (req, res, next) => {
  const headers = req.headers
  next()
}

module.exports = {
  verifyUser,
}
