import APIError from "../utils/APIError.utils.js";
import jwt from "jsonwebtoken";
import { validateID } from "../validators/validateID.validators.js";

export const routeGuard = async (req, res, next) => {
  try {
    // extract contents from request authorization header
    const authorization = req.headers?.authorization;

    // check if content exists
    if (!authorization || typeof authorization !== "string") {
      throw new APIError(401, "AUTHORIZATION_ERROR", "Access denied.", null);
    }

    // extract Bearer and token from authorization header contents
    const [bearer, accessToken] = authorization.split(" ");

    // check if all extracted values are viable
    if (!bearer || bearer !== "Bearer" || !accessToken) {
      throw new APIError(401, "AUTHORIZATION_ERROR", "Access denied.", null);
    }

    // validate token and decode user id from it
    const { userID } = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

    // validate user id
    validateID(userID);

    // save userID inside req.userID for later consumption
    req.userID = userID;

    // forward to the next piece of middleware
    next();
  } catch (error) {
    next(error);
  }
};
