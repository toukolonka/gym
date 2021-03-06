/* eslint-disable max-classes-per-file */

class CustomError extends Error {
  constructor(message) {
    super(message);
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    //  @see Node.js reference (bottom)
    Error.captureStackTrace(this, this.constructor);
  }
}

class AuthorizationHeaderError extends CustomError {}

class AuthorizationError extends CustomError {}

class InvalidTokenError extends CustomError {}

class UserNotFoundError extends CustomError {}

class InvalidParametersError extends CustomError {}

class InvalidLoginError extends CustomError {}

class ResourceNotFoundError extends CustomError {}

module.exports = {
  AuthorizationHeaderError,
  AuthorizationError,
  InvalidTokenError,
  UserNotFoundError,
  InvalidParametersError,
  InvalidLoginError,
  ResourceNotFoundError,
};
