const logger = require('./logger');
const Errors = require('./errors');

const requestLogger = (request, _, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// eslint-disable-next-line consistent-return
const errorHandler = (error, _, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).send({ message: error.message });
  } if (error instanceof Errors.InvalidTokenError) {
    return response.status(401).send({ message: error.message });
  } if (error instanceof Errors.AuthorizationHeaderError) {
    return response.status(401).send({ message: error.message });
  } if (error instanceof Errors.AuthorizationError) {
    return response.status(401).send({ message: error.message });
  } if (error instanceof Errors.UserNotFoundError) {
    return response.status(400).send({ message: error.message });
  } if (error instanceof Errors.InvalidParametersError) {
    return response.status(400).send({ message: error.message });
  } if (error instanceof Errors.InvalidLoginError) {
    return response.status(401).send({ message: error.message });
  } if (error.name === 'MongoServerError' && error.code === 11000) {
    return response.status(409).send({ message: 'Email or username already in use' });
  } if (error.name === 'MongoServerError') {
    return response.status(409).send({ message: 'Database error' });
  } if (error instanceof Errors.ResourceNotFoundError) {
    return response.status(404).send({ message: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
