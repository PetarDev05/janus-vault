class APIError extends Error {
  constructor(statusCode, code, message, leave) {
    super(message);
    this.success = false;
    this.statusCode = statusCode;
    this.code = code;
    this.leave = leave;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default APIError;
