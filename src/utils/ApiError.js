class ApiError extends Error {
  constructor(
    statusCode, // 400, 404, 500
    message = "An error occurred while processing your request.", // error message
    Error = [], // array of errors
    stack = "" // error stack
  ) {
    super(message); // error message
    this.statusCode = statusCode; // 400, 404, 500
    this.data = null; // data returned
    this.message = message; // error message
    this.errors = errors; // array of errors

    if (stack) {
      // if stack is provided
      this.stack = stack; // set stack
    } else {
      // if stack is not provided
      Error.captureStackTrace(this, this.constructor); // capture stack trace
    }
  }
}
