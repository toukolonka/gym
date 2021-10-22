/* eslint-disable no-underscore-dangle */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const Exercise = require('./models/exercise');
const User = require('./models/user');
const Workout = require('./models/workout');

const loginRouter = require('./controllers/login');

const app = express();
app.use(express.static('build'));
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

/*
  Extracts and validates the token.
  If token is invalid or does exists, function returns null.
  If token is valid, function returns the User it belongs to.
*/
const authorizeUser = async (request) => {
  const authorization = request.get('authorization'); // Extract token from request
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    // Extract token
    const token = authorization.substring(7);
    // If jwt.verify or something else fails, just return null
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!token || !decodedToken.id) {
        return null;
      }
      const user = await User.findById(decodedToken.id);
      return user;
    } catch {
      return null;
    }
  }
  return null;
};

app.use(requestLogger);
app.use('/api/login', loginRouter);

app.get('/api/hello', (_, response) => {
  response.send('Hello from server!');
});

app.get('/api/exercises', (_, response) => {
  Exercise.find({}).then((exercises) => {
    response.json(exercises);
  });
});

app.get('/api/users', (_, response) => {
  User.find({}).then((users) => {
    response.json(users);
  });
});

app.get('/api/workouts', (_, response) => {
  Workout.find({}).then((workouts) => {
    response.json(workouts);
  });
});

app.post('/api/exercises', async (request, response) => {
  const { body } = request;

  const exercise = new Exercise({
    name: body.name,
    description: body.description,
  });

  const savedExercise = await exercise.save();

  response.json(savedExercise);
});

app.post('/api/users', async (request, response) => {
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

app.post('/api/workouts', async (request, response) => {
  const { body } = request;
  const user = await authorizeUser(request);

  console.log(user);

  if (user === null) {
    return response.status(401).json({
      error: 'User not authorized',
    });
  }

  const workout = new Workout({
    date: new Date(),
    template: body.template,
    user: user._id,
    sets: body.sets,
  });

  const savedWorkout = await workout.save();

  user.workouts = user.workouts.concat(savedWorkout._id);
  await user.save();

  return response.json(savedWorkout);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
