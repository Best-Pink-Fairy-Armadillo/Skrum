const path = require('path');
const express = require('express');
const controller = require('./controllers');
const { application } = require('express');
const cookieParser = require('cookie-parser');
// const session = require('express-session');

const app = express();

const PORT = 3000;

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(cookieParser());
// app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(express.urlencoded({ extended: true }));

// HTTP Request Routes
// app.get('/api/signin', controller.verifyUser, (req, res) => {
//   res.status(200).json(res.locals.currentUser);
// });

app.post(
  '/api/signup',
  controller.createUser,
  controller.setSSIDCookie,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

app.post(
  '/api/signin',
  controller.verifyUser,
  controller.setSSIDCookie,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

app.post(
  '/api/createTask',
  controller.isLoggedIn,
  controller.createTask,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

app.post(
  '/api/getTasks',
  controller.isLoggedIn,
  controller.getTasks,
  (req, res) => {
    res.status(200).json(res.locals.allTasks);
  }
);

app.delete(
  '/api/deleteTask',
  controller.isLoggedIn,
  controller.deleteTask,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

app.patch(
  '/api/editTask',
  controller.isLoggedIn,
  controller.editTask,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

// serve html and css
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
app.use('/style.css', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../style.css'));
});

//catch 404
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
