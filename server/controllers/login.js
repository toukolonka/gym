/* eslint-disable no-underscore-dangle */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const Errors = require('../utils/errors');
require('dotenv').config();

loginRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;

    if (body.username === undefined || body.password === undefined) {
      throw new Errors.InvalidParametersError('Username or password was not provided');
    }

    const user = await User.findOne({ username: body.username });
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      throw new Errors.InvalidLoginError('Username or password invalid');
    }

    const userForToken = {
      username: user.username,
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    return response
      .status(200)
      .send({
        token, user: userForToken,
      });
  } catch (err) {
    next(err);
  }
});

module.exports = loginRouter;
