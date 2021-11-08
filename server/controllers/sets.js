/* eslint-disable no-underscore-dangle */

const setsRouter = require('express').Router();
const Workout = require('../models/workout');
const GymSet = require('../models/set');

setsRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;

    const set = new GymSet({
      weight: body.weight,
      repetitions: body.repetitions,
      completed: false,
      exercise: body.exerciseId,
      workout: body.workoutId,
    });

    const savedSet = await set.save();

    const workout = await Workout.findById(body.workoutId);
    workout.sets = workout.sets.concat(savedSet._id);

    await workout.save();

    const updatedWorkout = await Workout
      .findById(body.workoutId)
      .populate({
        path: 'sets',
        type: Array,
        populate: {
          path: 'exercise',
          model: 'Exercise',
          select: 'name',
        },
      });
    return response.json(updatedWorkout);
  } catch (err) {
    next(err);
  }
});

setsRouter.put('/:id', async (request, response, next) => {
  try {
    const { body } = request;

    const set = {
      weight: body.weight,
      repetitions: body.repetitions,
      completed: body.completed,
    };

    await GymSet.findByIdAndUpdate(request.params.id, set, { new: true });

    const workout = await Workout
      .findById(body.workout)
      .populate({
        path: 'sets',
        type: Array,
        populate: {
          path: 'exercise',
          model: 'Exercise',
          select: 'name',
        },
      });
    return response.json(workout);
  } catch (err) {
    next(err);
  }
});

setsRouter.delete('/:id', async (request, response, next) => {
  try {
    const deletedSet = await GymSet.findByIdAndRemove(request.params.id);
    const workout = await Workout.findById(deletedSet.workout);
    workout.sets = workout.sets.filter((set) => (set.id !== deletedSet.id));

    await workout.save();

    const updatedWorkout = await Workout
      .findById(deletedSet.workout)
      .populate({
        path: 'sets',
        type: Array,
        populate: {
          path: 'exercise',
          model: 'Exercise',
          select: 'name',
        },
      });
    return response.json(updatedWorkout);
  } catch (err) {
    next(err);
  }
});

module.exports = setsRouter;
