/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const logger = require('./utils/logger');
require('dotenv').config();

const Exercise = require('./models/exercise');
const User = require('./models/user');
const Workout = require('./models/workout');
const Set = require('./models/set');

mongoose
  .connect(process.env.DEV_MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message);
  });

const initTestData = async () => {
  await Exercise.deleteMany({})
    .then(() => {
      logger.info('Deleted all exercises');
    });

  await User.deleteMany({})
    .then(() => {
      logger.info('Deleted all users');
    });

  await Workout.deleteMany({})
    .then(() => {
      logger.info('Deleted all workouts');
    });

  const password = 'user123';
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: 'user123',
    passwordHash,
    workouts: [],
  });

  const savedUser = await user.save();

  const exercise = new Exercise({
    name: 'Bench press',
    description: 'A lift or exercise in which a weight is raised by extending the arms upward while lying on a bench',
    category: 'Upper',
    user: null,
  });

  const savedExercise = await exercise.save();

  const workout = new Workout({
    date: new Date(),
    template: false,
    user: savedUser._id,
    sets: [],
  });

  const savedWorkout = await workout.save();

  user.workouts = user.workouts.concat(savedWorkout._id);
  await user.save();

  const set = new Set({
    weight: 50,
    repetitions: 10,
    exercise: savedExercise._id,
    workout: savedWorkout._id,
  });

  const savedSet = await set.save();

  workout.sets = workout.sets.concat(savedSet._id);
  await workout.save();
};

initTestData()
  .then(() => {
    logger.info('Successfully initialized test data');
    mongoose.connection.close();
  })
  .catch((error) => {
    logger.error('Error initializing test data:', error.message);
    mongoose.connection.close();
  });
