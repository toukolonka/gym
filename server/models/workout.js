/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

const { model, Schema } = require('mongoose');

const workoutSchema = new Schema({
  date: Date,
  template: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  sets: [
    {
      weight: Number,
      repetitions: Number,
      exercise: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
      },
    },
  ],
});

workoutSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = model('Workout', workoutSchema);
