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
    return response.status(400).json({ error: error.message });
  } if (error instanceof Errors.InvalidTokenError) {
    return response.status(401).json({ error: error.message });
  } if (error instanceof Errors.AuthorizationHeaderError) {
    return response.status(401).json({ error: error.message });
  } if (error instanceof Errors.AuthorizationError) {
    return response.status(401).json({ error: error.message });
  } if (error instanceof Errors.UserNotFoundError) {
    return response.status(400).json({ error: error.message });
  } if (error instanceof Errors.InvalidParametersError) {
    return response.status(400).json({ error: error.message });
  } if (error instanceof Errors.InvalidLoginError) {
    return response.status(401).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
