import User from "../models/user.models.js";
import Session from "../models/session.models.js";
import { generateAccessToken } from "../utils/generateAccessToken.utils.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.utils.js";
import { validatePassword } from "../validators/validatePassword.validators.js";

export const signInService = async (username, password) => {
  // find existing user in database by username
  const existingUser = await User.findUserByUsername(username);

  // compare plain text password that user provided and the one stored in database
  await validatePassword(password, existingUser.password);

  // generate tokens
  const { refreshTokenPlain, refreshTokenHash } = generateRefreshToken();
  const accessToken = generateAccessToken(existingUser._id);

  // Create new user-session
  await Session.createSession(existingUser._id, refreshTokenHash);

  // return resulting data
  return { existingUser, accessToken, refreshTokenPlain };
};
