import ms from "ms";
import { signInService } from "../services/signInService.services.js";
import APIResponse from "../../../utils/APIResponse.utils.js";
import { validateSignInCredentials } from "../validators/validateSignInCredentials.validators.js";

export const signInUser = async (req, res, next) => {
  try {
    // extract user input
    const { username, password } = req.body;

    // validate user input
    await validateSignInCredentials(username, password);

    // find existing user and create session for him
    const { existingUser, accessToken, refreshTokenPlain } =
      await signInService(username, password);

    // save refresh token to the HTTP-only cookie`
    res.cookie("refreshToken", refreshTokenPlain, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: ms(process.env.COOKIE_EXP_TIME),
    });

    // Normalize user object
    const user = {
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      createdAt: existingUser.createdAt,
    };

    // send response to the client
    const response = new APIResponse(
      200,
      { user, accessToken },
      "You are signed in successfully.",
    );
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
