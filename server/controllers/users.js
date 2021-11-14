/* eslint-disable no-underscore-dangle */

const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Errors = require('../utils/errors');
const authorizeUser = require('../services/authorizationService');

usersRouter.get('/', (_, response, next) => {
  try {
    User.find({}).then((users) => {
      response.json(users);
    });
  } catch (err) {
    next(err);
  }
});

usersRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;

    if (body.username === undefined || body.password === undefined) {
      throw new Errors.InvalidParametersError('Username or password was not provided');
    }

    if (body.username.length < 5 || body.password.length < 5) {
      throw new Errors.InvalidParametersError('Username or password provided is not long enough');
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      passwordHash,
      workouts: [],
    });

    const savedUser = await user.save();

    response.json(savedUser);
  } catch (err) {
    next(err);
  }
});

usersRouter.put('/', async (request, response, next) => {
  try {
    const { body } = request;
    const user = await authorizeUser(request);

    if (!body.email && !body.newPassword) {
      throw new Errors.InvalidParametersError('New email or new password was not provided');
    }

    if (body.newPassword) {
      if (body.newPassword.length < 5) {
        throw new Errors.InvalidParametersError('New password provided is not long enough');
      }
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(body.newPassword, saltRounds);

      user.passwordHash = passwordHash;
    }

    if (body.email) {
      user.email = body.email;
    }

    const updatedUser = await user.save();
    response.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
