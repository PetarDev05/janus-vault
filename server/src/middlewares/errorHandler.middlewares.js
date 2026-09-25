import JsonWebTokenError from "jsonwebtoken";
import TokenExpiredError from "jsonwebtoken";
import APIError from "../utils/APIError.utils.js";
import { signOutService } from "../modules/auth/services/signOutService.services.js";

export const errorHandler = async (err, req, res, next) => {
  let error = err;

  const refreshToken = req.cookies?.refreshToken;

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
      // ovde razmisli da li da svaki zahtev salje refresh token, jer u slucaju da data zahtev nema access token ili da je menjan, nemas nacin da izbacis korisnika iz sistema, ako nemas refresh token
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

  if (error.action === "SIGN_OUT") {
    await signOutService(refreshToken);
  }

  const response = {
    success: error.success,
    statusCode: error.statusCode,
    code: error.code,
    message: error.message,
    action: error.action,
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
  }

  res.status(response.statusCode).json(response);
};
