const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Exercise = require('./models/exercise');

const app = express();
app.use(express.static('build'));
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

app.use(requestLogger);

app.get('/api/hello', (_, response) => {
  response.send('Hello from server!');
});

app.get('/api/exercises', (_, response) => {
  Exercise.find({}).then((exercises) => {
    response.json(exercises);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
