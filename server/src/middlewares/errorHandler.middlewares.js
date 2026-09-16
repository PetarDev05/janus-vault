import JsonWebTokenError from "jsonwebtoken";
import TokenExpiredError from "jsonwebtoken";
import APIError from "../utils/APIError.utils.js";

export const errorHandler = (err, req, res, next) => {
  let error = err;

  console.log(error);

  if (error instanceof JsonWebTokenError.JsonWebTokenError) {
    if (error instanceof TokenExpiredError.TokenExpiredError) {
      error = new APIError(
        401,
        "AUTHORIZATION_ERROR",
        "Access token expired.",
        null,
      );
    } else {
      error = new APIError(
        401,
        "TOKEN_MALFORMED",
        "Security issue detected. Please sign in again.",
        "SIGN_OUT",
      );
    }
  } else {
    if (!(error instanceof APIError)) {
      error = new APIError(
        500,
        "INTERNAL_ERROR",
        "Something went wrong. Please try again later.",
        null,
      );
    }
  }

  const response = {
    success: error.success,
    statusCode: error.statusCode,
    code: error.code,
    message: error.message,
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
  }

  res.status(response.statusCode).json(response);
};
