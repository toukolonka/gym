const jwt = require('jsonwebtoken');
const User = require('../models/user');

/*
  Extracts and validates the token.
  If token is invalid or does exists, function returns null.
  If token is valid, function returns the User it belongs to.
*/
const authorizeUser = async (request) => {
  const authorization = request.get('authorization'); // Extract auth header from request and test that it starts with "bearer "
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    // Extract token
    const token = authorization.substring(7);
    // If jwt.verify or something else fails, just return null
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!token || !decodedToken.id) {
        return null;
      }
      const user = await User.findById(decodedToken.id);
      return user;
    } catch {
      return null;
    }
  }
  return null;
};

module.exports = authorizeUser;
