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

  const upper3 = new Exercise({
    name: 'Cable crossover',
    description: 'Isolation movement for chest. Use single grip handles in a cable machine and pull hands from the sides to center by using chest.',
    category: 'Upper',
    user: null,
  });

  const upper4 = new Exercise({
    name: 'Dumbell fly',
    description: 'Isolation movement for chest. Use two dumbbells in a flat bench and pull hands from the sides to center by using chest.',
    category: 'Upper',
    user: null,
  });

  const upper5 = new Exercise({
    name: 'Seated machine fly',
    description: 'Isolation movement for chest. Sit on the seated fly machine and pull hands from the sides to center by using chest.',
    category: 'Upper',
    user: null,
  });

  const upper6 = new Exercise({
    name: 'Barbell curl',
    description: 'Use barbell to curl with both hands at the same time.',
    category: 'Upper',
    user: null,
  });

  const upper7 = new Exercise({
    name: 'Dumbbell curl',
    description: 'Use two dumbells to curl with each hand separately.',
    category: 'Upper',
    user: null,
  });

  const upper8 = new Exercise({
    name: 'Dumbbell hammer curl',
    description: 'Use two dumbells to curl with each hand separately. Keep the wrists in the same position as using a hammer.',
    category: 'Upper',
    user: null,
  });

  const upper9 = new Exercise({
    name: 'Cable bar tricep extensions',
    description: 'Pull a cable-attached bar down with triceps.',
    category: 'Upper',
    user: null,
  });

  const upper10 = new Exercise({
    name: 'Dip',
    description: 'Lift yorself up in a dip rack by using chest and triceps.',
    category: 'Upper',
    user: null,
  });

  const upper11 = new Exercise({
    name: 'Lateral dumbbel raise',
    description: 'Isolation movement for shoulders. Use two dumbbells to raise your hands from sides to horizontal level.',
    category: 'Upper',
    user: null,
  });

  const upper12 = new Exercise({
    name: 'Overhead press',
    description: 'Use barbell to lift weight from chest level to above the head while standing.',
    category: 'Upper',
    user: null,
  });

  const benchPress = await upper1.save();
  const incBenchPress = await upper2.save();
  await upper3.save();
  await upper4.save();
  await upper5.save();
  await upper6.save();
  await upper7.save();
  await upper8.save();
  await upper9.save();
  await upper10.save();
  await upper11.save();
  await upper12.save();

  const legs1 = new Exercise({
    name: 'Leg press',
    description: 'Leg press is done sitting in a leg press machine. Sit on the machine with your back against the padded support and extend both legs.',
    category: 'Legs',
    user: null,
  });

  const legs2 = new Exercise({
    name: 'Squat',
    description: 'Lower your hips from a standing position and stand back up. Use barbell behind your neck, on top of shoulders to add weight.',
    category: 'Legs',
    user: null,
  });

  const legs3 = new Exercise({
    name: 'Front squat',
    description: 'Lower your hips from a standing position and stand back up. Use barbell in front of your neck, on top of shoulders to add weight.',
    category: 'Legs',
    user: null,
  });

  const legs4 = new Exercise({
    name: 'Calf raise',
    description: 'Raise yourself by using calves. Add weight with barbell, dumbbels or calf raise machine.',
    category: 'Legs',
    user: null,
  });

  const legs5 = new Exercise({
    name: 'Seated leg extension',
    description: 'Sit on a leg extension machine and extend both legs straight.',
    category: 'Legs',
    user: null,
  });

  const legs6 = new Exercise({
    name: 'Seated leg curl',
    description: 'Sit on a leg curl machine and pull the resistanse with your heels.',
    category: 'Legs',
    user: null,
  });

  const legPress = await legs1.save();
  const squat = await legs2.save();
  await legs3.save();
  await legs4.save();
  await legs5.save();
  await legs6.save();

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

  const core3 = new Exercise({
    name: 'Leg raise',
    description: 'Lie on a mat on your back and lift your legs.',
    category: 'Core',
    user: null,
  });

  const core4 = new Exercise({
    name: 'Back extension',
    description: 'Lie on a mat on your stomach and lift your upper body.',
    category: 'Core',
    user: null,
  });

  const core5 = new Exercise({
    name: 'Deadlift',
    description: 'Pull a barbell from the ground with your hands straight down to end up in a standing position.',
    category: 'Core',
    user: null,
  });

  const SitUp = await core1.save();
  const Crunch = await core2.save();
  await core3.save();
  await core4.save();
  await core5.save();

  const workout = new Workout({
    date: new Date(),
    template: false,
    user: savedUser._id,
    sets: [
      {
        weight: 80,
        repetitions: 10,
        completed: true,
        exercise: benchPress._id,
      },
      {
        weight: 80,
        repetitions: 10,
        completed: true,
        exercise: benchPress._id,
      },
      {
        weight: 80,
        repetitions: 10,
        completed: true,
        exercise: benchPress._id,
      },
      {
        weight: 50,
        repetitions: 10,
        completed: true,
        exercise: incBenchPress._id,
      },
      {
        weight: 50,
        repetitions: 10,
        completed: true,
        exercise: incBenchPress._id,
      },
      {
        weight: 50,
        repetitions: 10,
        completed: true,
        exercise: incBenchPress._id,
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: SitUp._id,
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: SitUp._id,
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: SitUp._id,
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
        exercise: legPress._id,
      },
      {
        weight: 250,
        repetitions: 12,
        completed: false,
        exercise: legPress._id,
      },
      {
        weight: 250,
        repetitions: 10,
        completed: false,
        exercise: legPress._id,
      },
      {
        weight: 250,
        repetitions: 8,
        completed: false,
        exercise: legPress._id,
      },
      {
        weight: 80,
        repetitions: 10,
        completed: false,
        exercise: squat._id,
      },
      {
        weight: 80,
        repetitions: 10,
        completed: false,
        exercise: squat._id,
      },
      {
        weight: 80,
        repetitions: 10,
        completed: false,
        exercise: squat._id,
      },
      {
        weight: 0,
        repetitions: 30,
        completed: false,
        exercise: Crunch._id,
      },
      {
        weight: 0,
        repetitions: 30,
        completed: false,
        exercise: Crunch._id,
      },
      {
        weight: 0,
        repetitions: 25,
        completed: false,
        exercise: Crunch._id,
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
