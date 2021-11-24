/* eslint-disable no-underscore-dangle */
const templatesRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const Workout = require('../models/workout');
const Errors = require('../utils/errors');
const authorizeUser = require('../services/authorizationService');

templatesRouter.get('/', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);

    const templates = await Workout
      .find({ user: user._id, template: true })
      .sort({ date: 'desc' })
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

templatesRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);

    if (!request.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Errors.ResourceNotFoundError(`Template with id ${request.params.id} not found`);
    }

    const template = await Workout
      .findById(request.params.id)
      .populate({
        path: 'sets',
        type: Array,
        populate: {
          path: 'exercise',
          model: 'Exercise',
        },
      });

    if (template === null) {
      throw new Errors.ResourceNotFoundError(`Template with id ${request.params.id} not found`);
    }

    if (template.user === null
      || template.user.toString() === user._id.toString()) {
      return response.json(template);
    }

    throw new Errors.AuthorizationError('Not authorized');
  } catch (err) {
    next(err);
  }
});

templatesRouter.post('/', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);

    const workout = new Workout({
      name: '',
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

templatesRouter.post('/workout/:id', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);

    if (!request.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Errors.ResourceNotFoundError(`Workout with id ${request.params.id} not found`);
    }

    const workout = await Workout.findById(request.params.id);

    if (workout === null) {
      throw new Errors.ResourceNotFoundError(`Workout with id ${request.params.id} not found`);
    }

    const sets = workout.sets.flat().map((set) => ({
      weight: set.weight,
      repetitions: set.repetitions,
      completed: false,
      exercise: set.exercise,
      uuid: uuidv4(),
    }));

    const template = new Workout({
      name: '',
      date: new Date(),
      template: true,
      user: user._id,
      sets,
    });

    const savedTemplate = await template.save();
    user.workouts = user.workouts.concat(savedTemplate._id);
    await user.save();

    return response.status(201).end();
  } catch (err) {
    next(err);
  }
});

templatesRouter.delete('/:id', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);

    if (!request.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Errors.ResourceNotFoundError(`Template with id ${request.params.id} not found`);
    }

    const template = await Workout.findById(request.params.id);

    if (template === null) {
      throw new Errors.ResourceNotFoundError(`Template with id ${request.params.id} not found`);
    }

    if (user.id === template.user.toString()) {
      const removedTemplate = await Workout.findByIdAndRemove(request.params.id);
      user.workouts = user.workouts.filter((workout) => workout._id !== removedTemplate._id);
      await user.save();
      return response.status(204).end();
    }

    throw new Errors.AuthorizationError('Not authorized');
  } catch (err) {
    next(err);
  }
});

module.exports = templatesRouter;
