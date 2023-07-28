const jwt = require('jsonwebtoken')

const authorise = (JWT_SECRET_KEY) => (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed!' })
    }
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY)
    req.userData = { username: decodedToken.username }
    next()
  } catch (err) {
    return res.status(403).json({ message: err.message })
  }
}

module.exports = authorise