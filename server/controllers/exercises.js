/* eslint-disable no-underscore-dangle */

const exercisesRouter = require('express').Router();
const Exercise = require('../models/exercise');
const Errors = require('../utils/errors');

exercisesRouter.get('/', (_, response, next) => {
  try {
    Exercise.find({}).sort({ name: 'asc' }).then((exercises) => {
      response.json(exercises);
    });
  } catch (err) {
    next(err);
  }
});

exercisesRouter.get('/:id', (request, response, next) => {
  try {
    Exercise.findById(request.params.id).then((exercise) => {
      response.json(exercise);
    });
  } catch (err) {
    next(err);
  }
});

exercisesRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;

    if (body.name === undefined || body.description === undefined) {
      throw new Errors.InvalidParametersError('Exercise name and description has to be provided');
    }

    const exercise = new Exercise({
      name: body.name,
      description: body.description,
      category: body.category,
    });

    await exercise.save();

    Exercise.find({}).sort({ name: 'asc' }).then((exercises) => {
      response.json(exercises);
    });
  } catch (err) {
    next(err);
  }
});

exercisesRouter.delete('/:id', (request, response, next) => {
  Exercise.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((err) => next(err));
});

module.exports = exercisesRouter;
