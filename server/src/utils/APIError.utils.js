class APIError extends Error {
  constructor(statusCode, code, message, action) {
    super(message);
    this.success = false;
    this.statusCode = statusCode;
    this.code = code;
    this.action = action;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default APIError;
