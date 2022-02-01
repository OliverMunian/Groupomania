const jwt = require('jsonwebtoken');
const path = require('path')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    req.user = decodedToken
    next();
  } catch (e) {
    console.log('errorToken')
      console.log(e)
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};