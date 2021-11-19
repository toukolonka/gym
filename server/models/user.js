/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  passwordHash: String,
  workouts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Workout',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = model('User', userSchema);
