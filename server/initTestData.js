/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
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
    email: 'user123@gmail.com',
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
  const cableCrossover = await upper3.save();
  await upper4.save();
  await upper5.save();
  const barCurl = await upper6.save();
  const curl = await upper7.save();
  await upper8.save();
  await upper9.save();
  await upper10.save();
  await upper11.save();
  const overhedPress = await upper12.save();

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
  const calves = await legs4.save();
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

  const sitUp = await core1.save();
  await core2.save();
  await core3.save();
  const back = await core4.save();
  await core5.save();

  const workout1 = new Workout({
    name: 'Chest day',
    date: new Date('2021-10-30'),
    template: false,
    user: savedUser._id,
    sets: [
      {
        weight: 80,
        repetitions: 10,
        completed: true,
        exercise: benchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 80,
        repetitions: 10,
        completed: true,
        exercise: benchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 80,
        repetitions: 8,
        completed: true,
        exercise: benchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 50,
        repetitions: 10,
        completed: true,
        exercise: incBenchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 50,
        repetitions: 10,
        completed: true,
        exercise: incBenchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 50,
        repetitions: 8,
        completed: true,
        exercise: incBenchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 12,
        completed: true,
        exercise: cableCrossover._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 12,
        completed: true,
        exercise: cableCrossover._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
    ],
  });

  const workout2 = new Workout({
    name: 'Chest day',
    date: new Date('2021-11-10'),
    template: false,
    user: savedUser._id,
    sets: [
      {
        weight: 80,
        repetitions: 10,
        completed: true,
        exercise: benchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 80,
        repetitions: 10,
        completed: true,
        exercise: benchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 80,
        repetitions: 10,
        completed: true,
        exercise: benchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 55,
        repetitions: 10,
        completed: true,
        exercise: incBenchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 55,
        repetitions: 10,
        completed: true,
        exercise: incBenchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 55,
        repetitions: 10,
        completed: true,
        exercise: incBenchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 12,
        completed: true,
        exercise: cableCrossover._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 12,
        completed: true,
        exercise: cableCrossover._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 12,
        completed: true,
        exercise: cableCrossover._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
    ],
  });

  const workout3 = new Workout({
    name: 'Chest day',
    date: new Date('2021-11-20'),
    template: false,
    user: savedUser._id,
    sets: [
      {
        weight: 85,
        repetitions: 10,
        completed: true,
        exercise: benchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 85,
        repetitions: 8,
        completed: true,
        exercise: benchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 85,
        repetitions: 8,
        completed: true,
        exercise: benchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 55,
        repetitions: 10,
        completed: true,
        exercise: incBenchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 55,
        repetitions: 10,
        completed: true,
        exercise: incBenchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 55,
        repetitions: 10,
        completed: true,
        exercise: incBenchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 25,
        repetitions: 12,
        completed: true,
        exercise: cableCrossover._id,
        uuid: uuidv4(),
      },
      {
        weight: 25,
        repetitions: 12,
        completed: true,
        exercise: cableCrossover._id,
        uuid: uuidv4(),
      },
      {
        weight: 25,
        repetitions: 12,
        completed: true,
        exercise: cableCrossover._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
    ],
  });

  const workout4 = new Workout({
    name: 'Leg day',
    date: new Date('2021-11-02'),
    template: false,
    user: savedUser._id,
    sets: [
      {
        weight: 200,
        repetitions: 12,
        completed: true,
        exercise: legPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 200,
        repetitions: 12,
        completed: true,
        exercise: legPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 200,
        repetitions: 10,
        completed: true,
        exercise: legPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 200,
        repetitions: 8,
        completed: true,
        exercise: legPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 80,
        repetitions: 10,
        completed: true,
        exercise: squat._id,
        uuid: uuidv4(),
      },
      {
        weight: 80,
        repetitions: 10,
        completed: true,
        exercise: squat._id,
        uuid: uuidv4(),
      },
      {
        weight: 80,
        repetitions: 10,
        completed: true,
        exercise: squat._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 30,
        completed: true,
        exercise: calves._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 30,
        completed: true,
        exercise: calves._id,
        uuid: uuidv4(),
      },
    ],
  });

  const workout5 = new Workout({
    name: 'Leg day',
    date: new Date('2021-11-12'),
    template: false,
    user: savedUser._id,
    sets: [
      {
        weight: 225,
        repetitions: 10,
        completed: true,
        exercise: legPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 225,
        repetitions: 10,
        completed: true,
        exercise: legPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 225,
        repetitions: 10,
        completed: true,
        exercise: legPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 225,
        repetitions: 8,
        completed: true,
        exercise: legPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 85,
        repetitions: 10,
        completed: true,
        exercise: squat._id,
        uuid: uuidv4(),
      },
      {
        weight: 85,
        repetitions: 10,
        completed: true,
        exercise: squat._id,
        uuid: uuidv4(),
      },
      {
        weight: 85,
        repetitions: 10,
        completed: true,
        exercise: squat._id,
        uuid: uuidv4(),
      },
      {
        weight: 30,
        repetitions: 30,
        completed: true,
        exercise: calves._id,
        uuid: uuidv4(),
      },
      {
        weight: 30,
        repetitions: 30,
        completed: true,
        exercise: calves._id,
        uuid: uuidv4(),
      },
      {
        weight: 30,
        repetitions: 30,
        completed: true,
        exercise: calves._id,
        uuid: uuidv4(),
      },
    ],
  });

  const workout6 = new Workout({
    name: 'Leg day',
    date: new Date('2021-11-22'),
    template: false,
    user: savedUser._id,
    sets: [
      {
        weight: 250,
        repetitions: 10,
        completed: true,
        exercise: legPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 225,
        repetitions: 10,
        completed: true,
        exercise: legPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 225,
        repetitions: 10,
        completed: true,
        exercise: legPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 225,
        repetitions: 8,
        completed: true,
        exercise: legPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 90,
        repetitions: 10,
        completed: true,
        exercise: squat._id,
        uuid: uuidv4(),
      },
      {
        weight: 90,
        repetitions: 10,
        completed: true,
        exercise: squat._id,
        uuid: uuidv4(),
      },
      {
        weight: 85,
        repetitions: 10,
        completed: true,
        exercise: squat._id,
        uuid: uuidv4(),
      },
      {
        weight: 85,
        repetitions: 8,
        completed: true,
        exercise: squat._id,
        uuid: uuidv4(),
      },
      {
        weight: 40,
        repetitions: 30,
        completed: true,
        exercise: calves._id,
        uuid: uuidv4(),
      },
      {
        weight: 40,
        repetitions: 30,
        completed: true,
        exercise: calves._id,
        uuid: uuidv4(),
      },
      {
        weight: 40,
        repetitions: 30,
        completed: true,
        exercise: calves._id,
        uuid: uuidv4(),
      },
    ],
  });

  const workout7 = new Workout({
    name: 'Core and arms day',
    date: new Date('2021-11-05'),
    template: false,
    user: savedUser._id,
    sets: [
      {
        weight: 10,
        repetitions: 10,
        completed: true,
        exercise: curl._id,
        uuid: uuidv4(),
      },
      {
        weight: 10,
        repetitions: 10,
        completed: true,
        exercise: curl._id,
        uuid: uuidv4(),
      },
      {
        weight: 10,
        repetitions: 10,
        completed: true,
        exercise: curl._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 10,
        completed: true,
        exercise: barCurl._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 10,
        completed: true,
        exercise: barCurl._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 10,
        completed: true,
        exercise: barCurl._id,
        uuid: uuidv4(),
      },
      {
        weight: 30,
        repetitions: 10,
        completed: true,
        exercise: overhedPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 30,
        repetitions: 10,
        completed: true,
        exercise: overhedPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 30,
        repetitions: 10,
        completed: true,
        exercise: overhedPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 5,
        repetitions: 15,
        completed: true,
        exercise: back._id,
        uuid: uuidv4(),
      },
      {
        weight: 5,
        repetitions: 15,
        completed: true,
        exercise: back._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
    ],
  });

  const workout8 = new Workout({
    name: 'Core and arms day',
    date: new Date('2021-11-15'),
    template: false,
    user: savedUser._id,
    sets: [
      {
        weight: 12,
        repetitions: 10,
        completed: true,
        exercise: curl._id,
        uuid: uuidv4(),
      },
      {
        weight: 12,
        repetitions: 10,
        completed: true,
        exercise: curl._id,
        uuid: uuidv4(),
      },
      {
        weight: 12,
        repetitions: 10,
        completed: true,
        exercise: curl._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 10,
        completed: true,
        exercise: barCurl._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 10,
        completed: true,
        exercise: barCurl._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 10,
        completed: true,
        exercise: barCurl._id,
        uuid: uuidv4(),
      },
      {
        weight: 35,
        repetitions: 10,
        completed: true,
        exercise: overhedPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 35,
        repetitions: 10,
        completed: true,
        exercise: overhedPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 35,
        repetitions: 10,
        completed: true,
        exercise: overhedPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 10,
        repetitions: 15,
        completed: true,
        exercise: back._id,
        uuid: uuidv4(),
      },
      {
        weight: 10,
        repetitions: 15,
        completed: true,
        exercise: back._id,
        uuid: uuidv4(),
      },
      {
        weight: 10,
        repetitions: 15,
        completed: true,
        exercise: back._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
    ],
  });

  const workout9 = new Workout({
    name: 'Core and arms day',
    date: new Date('2021-11-25'),
    template: false,
    user: savedUser._id,
    sets: [
      {
        weight: 12,
        repetitions: 10,
        completed: true,
        exercise: curl._id,
        uuid: uuidv4(),
      },
      {
        weight: 12,
        repetitions: 10,
        completed: true,
        exercise: curl._id,
        uuid: uuidv4(),
      },
      {
        weight: 12,
        repetitions: 10,
        completed: true,
        exercise: curl._id,
        uuid: uuidv4(),
      },
      {
        weight: 25,
        repetitions: 10,
        completed: true,
        exercise: barCurl._id,
        uuid: uuidv4(),
      },
      {
        weight: 25,
        repetitions: 10,
        completed: true,
        exercise: barCurl._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 10,
        completed: true,
        exercise: barCurl._id,
        uuid: uuidv4(),
      },
      {
        weight: 35,
        repetitions: 10,
        completed: true,
        exercise: overhedPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 35,
        repetitions: 10,
        completed: true,
        exercise: overhedPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 35,
        repetitions: 10,
        completed: true,
        exercise: overhedPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 10,
        repetitions: 20,
        completed: true,
        exercise: back._id,
        uuid: uuidv4(),
      },
      {
        weight: 10,
        repetitions: 20,
        completed: true,
        exercise: back._id,
        uuid: uuidv4(),
      },
      {
        weight: 10,
        repetitions: 20,
        completed: true,
        exercise: back._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: true,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
    ],
  });

  const template1 = new Workout({
    name: 'Legs',
    date: new Date('2021-11-02'),
    template: true,
    user: savedUser._id,
    sets: [
      {
        weight: 200,
        repetitions: 12,
        completed: false,
        exercise: legPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 200,
        repetitions: 12,
        completed: false,
        exercise: legPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 200,
        repetitions: 10,
        completed: false,
        exercise: legPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 200,
        repetitions: 8,
        completed: false,
        exercise: legPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 80,
        repetitions: 10,
        completed: false,
        exercise: squat._id,
        uuid: uuidv4(),
      },
      {
        weight: 80,
        repetitions: 10,
        completed: false,
        exercise: squat._id,
        uuid: uuidv4(),
      },
      {
        weight: 80,
        repetitions: 10,
        completed: false,
        exercise: squat._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 30,
        completed: false,
        exercise: calves._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 30,
        completed: false,
        exercise: calves._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 25,
        completed: false,
        exercise: calves._id,
        uuid: uuidv4(),
      },
    ],
  });

  const template2 = new Workout({
    name: 'Chest',
    date: new Date('2021-10-30'),
    template: true,
    user: savedUser._id,
    sets: [
      {
        weight: 80,
        repetitions: 10,
        completed: false,
        exercise: benchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 80,
        repetitions: 10,
        completed: false,
        exercise: benchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 80,
        repetitions: 8,
        completed: false,
        exercise: benchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 50,
        repetitions: 10,
        completed: false,
        exercise: incBenchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 50,
        repetitions: 10,
        completed: false,
        exercise: incBenchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 50,
        repetitions: 8,
        completed: false,
        exercise: incBenchPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 12,
        completed: false,
        exercise: cableCrossover._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 12,
        completed: false,
        exercise: cableCrossover._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 10,
        completed: false,
        exercise: cableCrossover._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: false,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: false,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: false,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
    ],
  });

  const template3 = new Workout({
    name: 'Core and arms',
    date: new Date('2021-11-05'),
    template: true,
    user: savedUser._id,
    sets: [
      {
        weight: 10,
        repetitions: 10,
        completed: false,
        exercise: curl._id,
        uuid: uuidv4(),
      },
      {
        weight: 10,
        repetitions: 10,
        completed: false,
        exercise: curl._id,
        uuid: uuidv4(),
      },
      {
        weight: 10,
        repetitions: 10,
        completed: false,
        exercise: curl._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 10,
        completed: false,
        exercise: barCurl._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 10,
        completed: false,
        exercise: barCurl._id,
        uuid: uuidv4(),
      },
      {
        weight: 20,
        repetitions: 10,
        completed: false,
        exercise: barCurl._id,
        uuid: uuidv4(),
      },
      {
        weight: 30,
        repetitions: 10,
        completed: false,
        exercise: overhedPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 30,
        repetitions: 10,
        completed: false,
        exercise: overhedPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 30,
        repetitions: 10,
        completed: false,
        exercise: overhedPress._id,
        uuid: uuidv4(),
      },
      {
        weight: 5,
        repetitions: 15,
        completed: false,
        exercise: back._id,
        uuid: uuidv4(),
      },
      {
        weight: 5,
        repetitions: 15,
        completed: false,
        exercise: back._id,
        uuid: uuidv4(),
      },
      {
        weight: 5,
        repetitions: 15,
        completed: false,
        exercise: back._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: false,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: false,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
      {
        weight: 0,
        repetitions: 25,
        completed: false,
        exercise: sitUp._id,
        uuid: uuidv4(),
      },
    ],
  });

  const savedTemplate1 = await template1.save();
  const savedTemplate2 = await template2.save();
  const savedTemplate3 = await template3.save();
  const savedWorkout1 = await workout1.save();
  const savedWorkout2 = await workout2.save();
  const savedWorkout3 = await workout3.save();
  const savedWorkout4 = await workout4.save();
  const savedWorkout5 = await workout5.save();
  const savedWorkout6 = await workout6.save();
  const savedWorkout7 = await workout7.save();
  const savedWorkout8 = await workout8.save();
  const savedWorkout9 = await workout9.save();

  user.workouts = user.workouts.concat(savedTemplate1._id);
  user.workouts = user.workouts.concat(savedTemplate2._id);
  user.workouts = user.workouts.concat(savedTemplate3._id);
  user.workouts = user.workouts.concat(savedWorkout1._id);
  user.workouts = user.workouts.concat(savedWorkout2._id);
  user.workouts = user.workouts.concat(savedWorkout3._id);
  user.workouts = user.workouts.concat(savedWorkout4._id);
  user.workouts = user.workouts.concat(savedWorkout5._id);
  user.workouts = user.workouts.concat(savedWorkout6._id);
  user.workouts = user.workouts.concat(savedWorkout7._id);
  user.workouts = user.workouts.concat(savedWorkout8._id);
  user.workouts = user.workouts.concat(savedWorkout9._id);
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
