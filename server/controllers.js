const db = require('./models');
require('dotenv').config();

let controller = {
  createUser: async (req, res, next) => {
    const testQuery = 'SELECT id FROM users WHERE username=$1';
    // hardcoding group_id, can change later
    const queryString =
      'INSERT INTO users (USERNAME, PASSWORD, GROUP_ID) VALUES ($1, $2, 1);';
    const { username, password } = req.body;
    console.log(username);
    try {
      const userExists = await db.query(testQuery, [username]);
      if (!userExists[0]) {
        const newUser = await db.query(queryString, [username, password]);
        res.locals = { signin: 'User successfully created' };
      } else if (userExists[0]) {
        res.locals = { error: 'username not available' };
      }
      return next();
    } catch (error) {
      return next({
        log: `Express error handler caught createUser middlware error: ${error}`,
        status: 409,
        message: { err: 'An error occurred' },
      });
    }
  },
  verifyUser: async (req, res, next) => {
    const { username, password } = req.body;
    const testQuery = 'SELECT * FROM users WHERE username=$1 and password=$2';
    try {
      const verification = await db.query(testQuery, [username, password]);
      if (verification[0]) {
        res.locals = { signin: 'Login success' };
      }
    } catch (error) {
      return next({
        log: `Express error handler caught verifyUser middlware error: ${error}`,
        status: 409,
        message: { err: 'An error occurred' },
      });
    }
    next();
  },
};

module.exports = controller;
