import APIError from "../utils/APIError.utils.js";
import jwt from "jsonwebtoken";
import TokenExpiredError from "jsonwebtoken";
import { validateId } from "../modules/auth/validators/validateId.validators.js";

export const routeGuard = async (req, res, next) => {
  try {
    // extract contents from request authorization header
    const authorization = req.headers?.authorization;

    // check if content exists
    if (!authorization || typeof authorization !== "string") {
      throw new APIError(401, "AUTHORIZATION_ERROR", "Access denied.");
    }

    // extract Bearer and token from authorization header contents
    const [bearer, accessToken] = authorization.split(" ");

    // check if all extracted values are viable
    if (!bearer || bearer !== "Bearer" || !accessToken) {
      throw new APIError(401, "AUTHORIZATION_ERROR", "Access denied.");
    }

    // validate token and decode user id from it
    const { userId } = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

    // validate user id
    validateId(userId);

    // save userId inside req.userId for later consumption
    req.userId = userId;

    // forward to the next piece of middleware
    next();
  } catch (error) {
    next(error);
  }
};
