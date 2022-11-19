const path = require('path');
const express = require('express');
const controller = require('./controllers');
const { application } = require('express');

const app = express();

const PORT = 3000;

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP Request Routes
// app.get('/api/signin', controller.verifyUser, (req, res) => {
//   res.status(200).json(res.locals.currentUser);
// });

app.post('/api/signup', controller.createUser, (req, res) => {
  res.status(200).json(res.locals);
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
app.use('/style.css', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../style.css'));
});
app.use((req, res) => {
  res.status(404).json('404 Page not found');
});
// Error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
