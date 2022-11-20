const db = require('./models');
const createError = require('./createError');
let controller = {
  createUser: async (req, res, next) => {
    const testQuery = 'SELECT id FROM users WHERE username=$1;';
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
      return next(createError(error, 'createUser'));
    }
  },

  verifyUser: async (req, res, next) => {
    const { username, password } = req.body;
    console.log(req.body);
    const testQuery = 'SELECT * FROM users WHERE username=$1 and password=$2;';
    const taskQuery = 'SELECT * FROM grouptasks WHERE id=$1;';
    try {
      const verification = await db.query(testQuery, [username, password]);
      if (verification.rows[0]) {
        const groupId = verification.rows[0].group_id;
        const userTasks = await db.query(taskQuery, [groupId]);
        //console.log(userTasks);
        res.locals = { signin: 'Login success', tasks: userTasks.rows };
      } else {
        res.locals = {
          error: 'Login attempt unsuccessful',
        };
      }
      return next();
    } catch (error) {
      return next(createError(error, 'verifyUser'));
    }
    // next();
  },
  // * setSSIDCookie - store the user id in a cookie
  // */
  setSSIDCookie: async (req, res, next) => {
    // write code here
    try {
      console.log(res.locals);
      if (res.locals.signin) {
        let createDbSession =
          'INSERT INTO sessions (cookie, username) VALUES ($1, $2);'; // add SQL syntax to add new session_id and cookie_id
        // create random number for cookie
        const randomCookie = Math.floor(Math.random() * 500);
        const { username } = req.body;
        console.log('hi');
        const sessionId = await db.query(createDbSession, [
          randomCookie,
          username,
        ]);
        console.log(sessionId);
        res.cookie('ssid', randomCookie, {
          httpOnly: true,
        });
      }
      return next();
    } catch (error) {
      return next(createError(error, 'setSSIDCookie'));
    }
  },

  isLoggedIn: async (req, res, next) => {
    // write code here
    const sessionQuery =
      'SELECT * FROM sessions WHERE cookie=$1 AND username=$2;';
    const { ssid } = req.cookies;
    const { username } = req.body;
    try {
      const session = await db.query(sessionQuery, [ssid, username]);
      if (session[0]) res.locals = { signin: 'Authenticated' };
      else res.locals = { error: 'Not Authenticated' };
      return next();
    } catch (error) {
      return next(createError(error, 'isLoggedIn'));
    }
  },

  createTask: async (req, res, next) => {
    const taskCreate = '';
    try {
      next();
    } catch (error) {
      return next(createError(error, 'createTask'));
    }
  },
};
/**
};
/**
 * startSession - create and save a new Session into the database.
 */
//   StartSession: (req, res, next) => {
//     //write code here
//     const id = res.locals.user._id;
//     // console.log(id);
//     Session.create({
//       cookieId: id,
//     }).then(() => {
//       return next();
//     });
//   },
// };

module.exports = controller;
