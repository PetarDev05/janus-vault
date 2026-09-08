import Session from "../models/session.models.js";
import User from "../models/user.models.js";
import { cryptoHashToken } from "../utils/cryptoHashToken.utils.js";
import { generateAccessToken } from "../utils/generateAccessToken.utils.js";
import { checkRefreshToken } from "../validators/checkRefreshToken.validators.js";

export const refreshSessionService = async (refreshToken) => {
  // validate refresh token existance
  checkRefreshToken(refreshToken, "refresh");

  // hash token
  const refreshTokenHash = cryptoHashToken(refreshToken);

  // find user session
  const session = await Session.findSessionByToken(refreshTokenHash);

  // find user based on session userID
  const existingUser = await User.findUserById(session.userID);

  // generate new access token
  const accessToken = generateAccessToken(existingUser._id);

  return { existingUser, accessToken };
};
