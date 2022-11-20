module.exports = {
  createError: (error, middleware) => {
    return {
      log: `Express error handler caught ${middleware} middleware error: ${error}`,
      status: 400,
      message: { err: 'An error occurred, check log for details' },
    };
  },
};
