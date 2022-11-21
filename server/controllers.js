const db = require('./models');
const createError = require('./createError');

let controller = {
  createUser: async (req, res, next) => {
    const testQuery = 'SELECT * FROM users WHERE username=$1;';
    // hardcoding group_id, can change later
    const queryString =
      'INSERT INTO users (USERNAME, PASSWORD, GROUP_ID) VALUES ($1, $2, $3);';
    const taskQuery = 'SELECT * FROM grouptasks WHERE id=$1;';
    const groupId = 1;
    const { username, password } = req.body;
    console.log(username);
    try {
      const userExists = await db.query(testQuery, [username]);
      if (!userExists.rows[0]) {
        const newUser = await db.query(queryString, [
          username,
          password,
          groupId,
        ]);
        const userTasks = await db.query(taskQuery, [groupId]);
        //console.log(userTasks);
        res.locals = { signin: 'User created', tasks: userTasks.rows };
      } else if (userExists.rows[0]) {
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
    console.log(ssid, username);
    try {
      const session = await db.query(sessionQuery, [ssid, username]);
      console.log(session);
      if (session.rows[0]) res.locals = { signin: 'Authenticated' };
      else res.locals = { error: 'Not Authenticated' };
      return next();
    } catch (error) {
      return next(createError(error, 'isLoggedIn'));
    }
  },

  createTask: async (req, res, next) => {
    const taskCreate =
      'INSERT INTO grouptasks (urgency, name, text, status) VALUES ($1, $2, $3, $4);';
    const { urgency, name, text, status } = req.body;
    try {
      const newTask = await db.query(taskCreate, [urgency, name, text, status]);
      const newTaskList = await db.query('SELECT * FROM grouptasks;');
      console.log(newTaskList);
      res.locals.tasks = newTaskList.rows;
      return next();
    } catch (error) {
      return next(createError(error, 'createTask'));
    }
  },

  getTasks: async (req, res, next) => {
    const taskGetAll = 'SELECT * FROM grouptasks;';
    try {
      const allTasks = await db.query(taskGetAll);
      res.locals.allTasks = allTasks.rows;
      return next();
    } catch (error) {
      return next(createError(error, 'getTasks'));
    }
  },

  editTask: async (req, res, next) => {
    const editTaskQuery =
      'Update grouptasks SET urgency = $1, name = $2, text = $3, status = $4 WHERE id = $5;';
    const getEditedTask = 'SELECT * FROM grouptasks WHERE id=$1;';
    const { id, urgency, name, text, status } = req.body;
    try {
      const editTask = await db.query(editTaskQuery, [
        urgency,
        name,
        text,
        status,
        id,
      ]);
      const gettingTask = await db.query(getEditedTask, [id]);
      res.locals.task = gettingTask.rows[0];
      return next();
    } catch (error) {
      return next(createError(error, 'editTasks'));
    }
  },

  deleteTask: async (req, res, next) => {
    const deleteTaskQ = 'DELETE FROM grouptasks WHERE id=$1;';
    const { id } = req.body;
    try {
      const deletedTheTask = await db.query(deleteTaskQ, [id]);
      res.locals.deleted = { deleted: `Task ${id} deleted!` };
      return next();
    } catch (error) {
      return next(createError(error, 'deleteTask'));
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
