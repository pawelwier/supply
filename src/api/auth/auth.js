const verifyUserData = (req, res, next) => {
  const headers = req.headers
  if (!headers.authorization) {
    next()
    return
  }
  console.log(headers.authorization.split(' ')[1])
  console.log(Buffer.from(headers.authorization.split(' ')[1], 'base64').toString().split(':'))
  next()
}

module.exports = {
  verifyUserData,
}
