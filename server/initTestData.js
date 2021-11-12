/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const logger = require('./utils/logger');
require('dotenv').config();

const Exercise = require('./models/exercise');
const User = require('./models/user');
const Workout = require('./models/workout');

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

  const upper1 = new Exercise({
    name: 'Bench press',
    description: 'A lift or exercise in which a weight is raised by extending the arms upward while lying on a bench.',
    category: 'Upper',
    user: null,
  });

  const upper2 = new Exercise({
    name: 'Incline bench press',
    description: 'A lift or exercise in which a weight is raised by extending the arms upward while lying on a incline (15 to 30 degrees) bench.',
    category: 'Upper',
    user: null,
  });

  const legs1 = new Exercise({
    name: 'Leg press',
    description: 'Leg press is done sitting in a leg press machine. Sit on the machine with your back against the padded support and extend both legs.',
    category: 'Legs',
    user: null,
  });

  const legs2 = new Exercise({
    name: 'Squat',
    description: 'A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up.',
    category: 'Legs',
    user: null,
  });

  const core1 = new Exercise({
    name: 'Sit up',
    description: 'Sit up is done by laying on back and getting from there to sitting position.',
    category: 'Core',
    user: null,
  });

  const core2 = new Exercise({
    name: 'Crunch',
    description: 'Crunch is done by laying on back and rising only upper core by tensing the abdominal muscles.',
    category: 'Core',
    user: null,
  });

  const savedExercise1 = await upper1.save();
  const savedExercise2 = await upper2.save();
  const savedExercise3 = await legs1.save();
  const savedExercise4 = await legs2.save();
  const savedExercise5 = await core1.save();
  const savedExercise6 = await core2.save();

  const workout = new Workout({
    date: new Date(),
    template: false,
    user: savedUser._id,
    sets: [
      {
        weight: 80,
        repetitions: 10,
        completed: true,
        exercise: savedExercise1._id,
      },
      {
        weight: 80,
        repetitions: 10,
        completed: true,
        exercise: savedExercise1._id,
      },
      {
        weight: 80,
        repetitions: 10,
        completed: true,
        exercise: savedExercise1._id,
      },
      {
        weight: 50,
        repetitions: 10,
        completed: true,
        exercise: savedExercise2._id,
      },
      {
        weight: 50,
        repetitions: 10,
        completed: true,
        exercise: savedExercise2._id,
      },
      {
        weight: 50,
        repetitions: 10,
        completed: true,
        exercise: savedExercise2._id,
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: savedExercise5._id,
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: savedExercise5._id,
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: savedExercise5._id,
      },
    ],
  });

  const template1 = new Workout({
    date: new Date(),
    template: true,
    user: savedUser._id,
    sets: [
      {
        weight: 250,
        repetitions: 12,
        completed: false,
        exercise: savedExercise3._id,
      },
      {
        weight: 250,
        repetitions: 12,
        completed: false,
        exercise: savedExercise3._id,
      },
      {
        weight: 250,
        repetitions: 10,
        completed: false,
        exercise: savedExercise3._id,
      },
      {
        weight: 250,
        repetitions: 8,
        completed: false,
        exercise: savedExercise3._id,
      },
      {
        weight: 80,
        repetitions: 10,
        completed: false,
        exercise: savedExercise4._id,
      },
      {
        weight: 80,
        repetitions: 10,
        completed: false,
        exercise: savedExercise4._id,
      },
      {
        weight: 80,
        repetitions: 10,
        completed: false,
        exercise: savedExercise4._id,
      },
      {
        weight: 0,
        repetitions: 30,
        completed: false,
        exercise: savedExercise6._id,
      },
      {
        weight: 0,
        repetitions: 30,
        completed: false,
        exercise: savedExercise6._id,
      },
      {
        weight: 0,
        repetitions: 25,
        completed: false,
        exercise: savedExercise6._id,
      },
    ],
  });

  const savedWorkout = await workout.save();
  const savedTemplate = await template1.save();

  user.workouts = user.workouts.concat(savedWorkout._id);
  user.workouts = user.workouts.concat(savedTemplate._id);
  await user.save();
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
