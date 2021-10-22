/* eslint-disable no-underscore-dangle */

const exercisesRouter = require('express').Router();
const Exercise = require('../models/exercise');

exercisesRouter.get('/', (_, response) => {
  Exercise.find({}).then((exercises) => {
    response.json(exercises);
  });
});

exercisesRouter.post('/', async (request, response) => {
  const { body } = request;

  const exercise = new Exercise({
    name: body.name,
    description: body.description,
  });

  const savedExercise = await exercise.save();

  response.json(savedExercise);
});

module.exports = exercisesRouter;
