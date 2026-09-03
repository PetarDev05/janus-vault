import Session from "../models/session.models.js";
import User from "../models/user.models.js";
import { generateAccessToken } from "../utils/generateAccessToken.utils.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.utils.js";
import { hashStr } from "../utils/hashStr.utils.js";

export const registrationService = async (username, email, password) => {
  // hash password provided by user
  const hashedPassword = await hashStr(password);

  // create new user account by inserting new user object into database
  const newUser = await User.createNewUser(username, email, hashedPassword);

  // generate tokens
  const { refreshTokenPlain, refreshTokenHash } = generateRefreshToken();
  const accessToken = generateAccessToken(newUser._id);

  // create session
  await Session.createSession(newUser._id, refreshTokenHash);

  // return resulting data
  return { newUser, accessToken, refreshTokenPlain };
};
