/* eslint-disable no-underscore-dangle */

const exercisesRouter = require('express').Router();
const Exercise = require('../models/exercise');
const Workout = require('../models/workout');
const Errors = require('../utils/errors');
const authorizeUser = require('../services/authorizationService');

exercisesRouter.get('/', async (request, response, next) => {
  const user = await authorizeUser(request);

  try {
    Exercise.find({ $or: [{ user: null }, { user: user._id }] }).sort({ name: 'asc' }).then((exercises) => {
      response.json(exercises);
    });
  } catch (err) {
    next(err);
  }
});

exercisesRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);

    const exercise = await Exercise.findById(request.params.id);

    if (exercise === null) {
      throw new Errors.ResourceNotFoundError(`Exercise with id ${request.params.id} not found`);
    }

    const workouts = await Workout
      .find({ user: user._id, template: false, 'sets.exercise': exercise._id })
      .populate({
        path: 'sets',
        type: Array,
        populate: {
          path: 'exercise',
          model: 'Exercise',
        },
      });

    const rms = workouts.map(
      (workout) => workout.sets,
    ).flat()
      .map(
        (set) => set.weight * (1 + (set.repetitions / 30)),
      );

    const maximum = Math.round(Math.max(...rms));

    const exerciseDetails = {
      exercise,
      workouts,
      maximum,
    };

    if (exercise.user === null
      || exercise.user.toString() === user._id.toString()) {
      return response.json(exerciseDetails);
    }

    throw new Errors.AuthorizationError('Not authorized');
  } catch (err) {
    next(err);
  }
});

exercisesRouter.post('/', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);

    const { body } = request;

    if (body.name === undefined || body.description === undefined) {
      throw new Errors.InvalidParametersError('Exercise name and description has to be provided');
    }

    const exercise = new Exercise({
      name: body.name,
      description: body.description,
      category: body.category,
      user: user._id,
    });

    await exercise.save();

    Exercise.find({ $or: [{ user: null }, { user: user._id }] }).sort({ name: 'asc' }).then((exercises) => {
      response.json(exercises);
    });
  } catch (err) {
    next(err);
  }
});

exercisesRouter.delete('/:id', async (request, response, next) => {
  try {
    const user = await authorizeUser(request);

    const exerciseToBeDeleted = await Exercise.findById(request.params.id);

    if (exerciseToBeDeleted === null) {
      throw new Errors.ResourceNotFoundError(`Exercise with id ${request.params.id} not found`);
    }

    if (exerciseToBeDeleted.user !== null
      && exerciseToBeDeleted.user.toString() === user._id.toString()) {
      await Exercise.findByIdAndRemove(request.params.id);
      return response.status(204).end();
    }

    throw new Errors.AuthorizationError('Not authorized');
  } catch (err) {
    next(err);
  }
});

module.exports = exercisesRouter;
