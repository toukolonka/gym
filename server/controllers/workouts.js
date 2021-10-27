/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */

const wokoutsRouter = require('express').Router();
const Workout = require('../models/workout');
const authorizeUser = require('../services/authorizationService');

/*
  Return the workouts of the user based on token
*/

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

/*
  Create a new workout
*/
wokoutsRouter.post('/', async (request, response, next) => {
  try {
    // Extract request body and get user based on token
    const { body } = request;
    const user = await authorizeUser(request);

    // Create new workout
    const workout = new Workout({
      date: new Date(),
      template: body.template,
      user: user._id,
      sets: body.sets,
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
