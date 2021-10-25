/* eslint-disable no-underscore-dangle */
const templatesRouter = require('express').Router();
const Workout = require('../models/workout');
const authorizeUser = require('../services/authorizationService');

templatesRouter.get('/', async (request, response) => {
  const user = await authorizeUser(request);

  if (user === null) {
    return response.status(401).json({
      error: 'User not authorized',
    });
  }

  const templates = await Workout.find({ user: user._id, template: true });
  return response.json(templates);
});

templatesRouter.post('/', async (request, response) => {
  const { body } = request;
  const user = await authorizeUser(request);

  if (user === null) {
    return response.status(401).json({
      error: 'User not authorized',
    });
  }

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
});

module.exports = templatesRouter;
