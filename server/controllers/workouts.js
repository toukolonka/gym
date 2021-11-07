/* eslint-disable no-underscore-dangle */

const wokoutsRouter = require('express').Router();
const Workout = require('../models/workout');
const Errors = require('../utils/errors');
const authorizeUser = require('../services/authorizationService');

/*
  Return the workouts of the user based on token
*/

wokoutsRouter.get('/', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);

    const workouts = await Workout
      .find({ user: user._id, template: false })
      .populate({
        path: 'sets',
        type: Array,
        populate: {
          path: 'exercise',
          model: 'Exercise',
          select: 'name',
        },
      });

    return response.json(workouts);
  } catch (err) {
    next(err);
  }
});

wokoutsRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);

    const workout = await Workout
      .findById(request.params.id)
      .populate({
        path: 'sets',
        type: Array,
        populate: {
          path: 'exercise',
          model: 'Exercise',
          select: 'name',
        },
      });

    if (workout.user === null
      || workout.user.toString() === user._id.toString()) {
      return response.json(workout);
    }

    throw new Errors.AuthorizationError('Not authorized');
  } catch (err) {
    next(err);
  }
});

/*
  Create a new workout
*/
wokoutsRouter.post('/', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);

    // Create new workout
    const workout = new Workout({
      date: new Date(),
      template: false,
      user: user._id,
      sets: [],
    });

    // Save the workout
    const savedWorkout = await workout.save();

    // Add workout to users workouts
    user.workouts = user.workouts.concat(savedWorkout._id);
    await user.save();

    return response.json(savedWorkout);
  } catch (err) {
    next(err);
  }
});

module.exports = wokoutsRouter;
