/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

const { model, Schema } = require('mongoose');

const exerciseSchema = new Schema({
  name: String,
  description: String,
  category: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

exerciseSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = model('Exercise', exerciseSchema);
