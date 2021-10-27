/* eslint-disable no-underscore-dangle */
const templatesRouter = require('express').Router();
const Workout = require('../models/workout');
const authorizeUser = require('../services/authorizationService');

templatesRouter.get('/', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);

    const templates = await Workout.find({ user: user._id, template: true });
    return response.json(templates);
  } catch (err) {
    next(err);
  }
});

templatesRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;
    const user = await authorizeUser(request);

    const workout = new Workout({
      date: new Date(),
      template: true,
      user: user._id,
      sets: body.sets,
    });

    const savedWorkout = await workout.save();

    user.workouts = user.workouts.concat(savedWorkout._id);
    await user.save();

    return response.json(savedWorkout);
  } catch (err) {
    next(err);
  }
});

module.exports = templatesRouter;
