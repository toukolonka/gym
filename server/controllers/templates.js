/* eslint-disable no-underscore-dangle */
const templatesRouter = require('express').Router();
const Workout = require('../models/workout');
const authorizeUser = require('../services/authorizationService');

templatesRouter.get('/', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);

    const templates = await Workout
      .find({ user: user._id, template: true })
      .populate({
        path: 'sets',
        type: Array,
        populate: {
          path: 'exercise',
          model: 'Exercise',
        },
      });

    return response.json(templates);
  } catch (err) {
    next(err);
  }
});

templatesRouter.post('/', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);

    const workout = new Workout({
      date: new Date(),
      template: true,
      user: user._id,
      sets: [],
    });

    const savedWorkout = await workout.save();

    user.workouts = user.workouts.concat(savedWorkout._id);
    await user.save();

    return response.json(savedWorkout);
  } catch (err) {
    next(err);
  }
});

templatesRouter.delete('/:id', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);
    const template = await Workout.findById(request.params.id);

    if (!template) {
      // @TODO throw error in the backend
      return response.status(400).end();
    }

    if (user.id === template.user.toString()) {
      const removedTemplate = await Workout.findByIdAndRemove(request.params.id);
      user.workouts = user.workouts.filter((workout) => workout._id !== removedTemplate._id);
      await user.save();
      return response.status(204).end();
    }

    // @TODO throw error in the backend
    return response.status(401).end();
  } catch (err) {
    next(err);
  }
});

module.exports = templatesRouter;
