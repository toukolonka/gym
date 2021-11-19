/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

const { model, Schema } = require('mongoose');

const workoutSchema = new Schema({
  name: String,
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
      completed: Boolean,
      exercise: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
      },
      uuid: String,
    },
  ],
});

workoutSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    if (returnedObject.sets.length > 0) {
      returnedObject.sets.forEach((s) => {
        delete s._id;
        delete s.__v;
      });
    }
  },
});

module.exports = model('Workout', workoutSchema);
