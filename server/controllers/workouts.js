/* eslint-disable no-underscore-dangle */

const wokoutsRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const Workout = require('../models/workout');
const Errors = require('../utils/errors');
const authorizeUser = require('../services/authorizationService');

wokoutsRouter.get('/', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);

    const workouts = await Workout
      .find({ user: user._id, template: false })
      .sort({ date: 'desc' })
      .populate({
        path: 'sets',
        type: Array,
        populate: {
          path: 'exercise',
          model: 'Exercise',
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

    if (!request.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Errors.ResourceNotFoundError(`Workout with id ${request.params.id} not found`);
    }

    const workout = await Workout
      .findById(request.params.id)
      .populate({
        path: 'sets',
        type: Array,
        populate: {
          path: 'exercise',
          model: 'Exercise',
        },
      });

    if (workout === null) {
      throw new Errors.ResourceNotFoundError(`Workout with id ${request.params.id} not found`);
    }

    if (workout.user === null
      || workout.user.toString() === user._id.toString()) {
      return response.json(workout);
    }

    throw new Errors.AuthorizationError('Not authorized');
  } catch (err) {
    next(err);
  }
});

wokoutsRouter.post('/', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);

    const date = new Date();
    // Create new workout
    const workout = new Workout({
      name: '',
      date,
      template: false,
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

wokoutsRouter.post('/template/:id', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);

    if (!request.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Errors.ResourceNotFoundError(`Template with id ${request.params.id} not found`);
    }

    const template = await Workout.findById(request.params.id);

    if (template === null) {
      throw new Errors.ResourceNotFoundError(`Template with id ${request.params.id} not found`);
    }

    const sets = template.sets.map((set) => ({
      weight: set.weight,
      repetitions: set.repetitions,
      completed: false,
      exercise: set.exercise,
      uuid: uuidv4(),
    }));

    const date = new Date();

    const workout = new Workout({
      name: '',
      date,
      template: false,
      user: user._id,
      sets,
    });

    const savedWorkout = await workout.save();
    user.workouts = user.workouts.concat(savedWorkout._id);
    await user.save();

    return response.json(savedWorkout);
  } catch (err) {
    next(err);
  }
});

wokoutsRouter.put('/:id', async (request, response, next) => {
  try {
    await authorizeUser(request);
    const { body } = request;

    const name = (body.name.length >= 20) ? body.name.substring(0, 20) : body.name;

    const workout = {
      name,
      sets: body.sets.map((set) => ({
        weight: set.weight,
        repetitions: set.repetitions,
        completed: set.completed,
        exercise: set.exercise.id,
        uuid: set.uuid,
      })),
    };

    const updatedWorkout = await Workout.findByIdAndUpdate(
      request.params.id, workout, { new: true },
    );

    if (updatedWorkout === null) {
      throw new Errors.ResourceNotFoundError(`Workout with id ${request.params.id} not found`);
    }

    return response.status(204).end();
  } catch (err) {
    next(err);
  }
});

wokoutsRouter.delete('/:id', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);

    if (!request.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Errors.ResourceNotFoundError(`Template with id ${request.params.id} not found`);
    }

    const workout = await Workout.findById(request.params.id);

    if (workout === null) {
      throw new Errors.ResourceNotFoundError(`Workout with id ${request.params.id} not found`);
    }

    if (user.id === workout.user.toString()) {
      const removedWorkout = await Workout.findByIdAndRemove(request.params.id);
      user.workouts = user.workouts.filter((w) => w._id !== removedWorkout._id);
      await user.save();
      return response.status(204).end();
    }

    throw new Errors.AuthorizationError('Not authorized');
  } catch (err) {
    next(err);
  }
});

module.exports = wokoutsRouter;
