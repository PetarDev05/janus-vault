import ms from "ms";
import APIResponse from "../../../utils/APIResponse.utils.js";
import { registrationService } from "../services/registrationService.services.js";
import { checkForExistingUser } from "../validators/checkForExistingUser.validator.js";
import { validateRegistrationCredentials } from "../validators/validateRegistrationCredentials.validators.js";

export const registerUser = async (req, res, next) => {
  try {
    // extract user input
    const { username, email, password } = req.body;

    // validate user input
    validateRegistrationCredentials(username, email, password);

    // check if there is a user with given credentials already
    checkForExistingUser(username, email);

    // create new user account
    const { newUser, accessToken, refreshTokenPlain } = await registrationService(
      username,
      email,
      password,
    );

    // save refresh token to the HTTP-only cookie
    res.cookie("refreshToken", refreshTokenPlain, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: ms(process.env.COOKIE_EXP_TIME),
    });

    // Normalize user object
    const user = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };

    // send response to the client
    const response = new APIResponse(
      200,
      { user, accessToken },
      "You are registered successfully.",
    );
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
