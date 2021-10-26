/* eslint-disable no-underscore-dangle */

const wokoutsRouter = require('express').Router();
const Workout = require('../models/workout');
const authorizeUser = require('../services/authorizationService');

/*
  Return the workouts of the user based on token
*/

// eslint-disable-next-line consistent-return
wokoutsRouter.get('/', async (request, response, next) => {
  try {
    // Get the user based on token
    const user = await authorizeUser(request);

    // Return the workouts based on user_id
    const workouts = await Workout.find({ user: user._id });
    return response.json(workouts);
  } catch (err) {
    next(err);
  }
});

wokoutsRouter.post('/', async (request, response) => {
  const { body } = request;
  const user = await authorizeUser(request);

  if (user === null) {
    return response.status(401).json({
      error: 'User not authorized',
    });
  }

  const workout = new Workout({
    date: new Date(),
    template: body.template,
    user: user._id,
    sets: body.sets,
  });

  const savedWorkout = await workout.save();

  user.workouts = user.workouts.concat(savedWorkout._id);
  await user.save();

  return response.json(savedWorkout);
});

module.exports = wokoutsRouter;
