/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

const { model, Schema } = require('mongoose');

const setSchema = new Schema({
  weight: Number,
  repetitions: Number,
  completed: Boolean,
  exercise: {
    type: Schema.Types.ObjectId,
    ref: 'Exercise',
  },
  workout: {
    type: Schema.Types.ObjectId,
    ref: 'Workout',
  },
});

setSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = model('GymSet', setSchema);
