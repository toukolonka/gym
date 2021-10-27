/* eslint-disable no-underscore-dangle */

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Errors = require('../utils/errors');

/*
  Extracts and validates the token.
  If token is valid, function returns the User it belongs to.
*/

// eslint-disable-next-line consistent-return
const authorizeUser = async (request) => {
  try {
    // Extract auth header from request and test that it starts with "bearer "
    const authorization = request.get('authorization');

    // Confirm the authorization header is correctly formatted
    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
      throw new Errors.AuthorizationHeaderError('Authorization-header is missing or invalid');
    }

    // Extract and Verify token
    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    // Handle missing or incorrect token
    if (!token || !decodedToken.id) {
      throw new Errors.InvalidTokenError('Token is missing or invalid');
    }

    // Find the user based on id and return
    const user = await User.findById(decodedToken.id);

    // User is null, if the JWT token has not expired but the actual user has been deleted
    if (user === null) {
      throw new Errors.UserNotFoundError('User has been deleted from the database');
    }

    return user;
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      throw new Errors.InvalidTokenError('Token is missing or invalid');
    } else {
      throw err;
    }
  }
};

module.exports = authorizeUser;
