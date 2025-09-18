const { constants } = require("../constants");

// Defines the error-handling middleware.
// Express identifies an error-handling middleware by the 4 arguments: (err, req, res, next).
// Any time you throw new Error(...) or next(err), Express passes it here.
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Sever error",
        message: err.message,
        stackTrace: err.stack,
        // err.message → short description of what went wrong.
        // err.stack → the detailed "path" of where the error happened (file name, line number, function calls).
      });
      break;
    default:
      console.log("No error, everything fine!");
      break;
  }
};
// Regular middleware = must call next() if you want the request to continue.
// Error handler middleware = final stop; it sends the response, so no next() needed.

module.exports = errorHandler;
