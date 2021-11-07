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
      type: Schema.Types.ObjectId,
      ref: 'GymSet',
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
