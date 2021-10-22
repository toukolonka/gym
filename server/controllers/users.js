/* eslint-disable no-underscore-dangle */

const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.get('/', (_, response) => {
  User.find({}).then((users) => {
    response.json(users);
  });
});

usersRouter.post('/', async (request, response) => {
  const { body } = request;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    passwordHash,
    workouts: [],
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = usersRouter;
