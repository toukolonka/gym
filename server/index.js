/* eslint-disable no-underscore-dangle */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const loginRouter = require('./controllers/login');
const wokoutsRouter = require('./controllers/workouts');
const setsRouter = require('./controllers/sets');
const exercisesRouter = require('./controllers/exercises');
const usersRouter = require('./controllers/users');
const templatesRouter = require('./controllers/templates');

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message);
  });

app.use('/api/login', loginRouter);
app.use('/api/workouts', wokoutsRouter);
app.use('/api/sets', setsRouter);
app.use('/api/users', usersRouter);
app.use('/api/exercises', exercisesRouter);
app.use('/api/templates', templatesRouter);

app.get('/api/health', (_, response) => {
  response.send('Health check ok!');
});

app.get('/*', (_, response) => {
  response.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const PORT = config.PORT || 3001;

app.listen(PORT, () => {
  logger.info(`Server listening on ${PORT}`);
});
