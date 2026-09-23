import Secret from "../../data/models/secret.models.js";
import Category from "../../data/models/category.models.js";
import Session from "../models/session.models.js";
import User from "../models/user.models.js";
import { cryptoHashToken } from "../utils/cryptoHashToken.utils.js";
import { checkRefreshToken } from "../validators/checkRefreshToken.validators.js";

export const deleteAccountService = async (refreshToken) => {
  // validate refresh token existance
  checkRefreshToken(refreshToken, "delete");

  // hash token
  const refreshTokenHash = cryptoHashToken(refreshToken);

  // find userID from the session
  const { userID } = await Session.findSessionByToken(refreshTokenHash);

  // delete all sessions and user objects with given userID
  await Secret.deleteAllSecrets(userID);
  await Category.deleteAllCategories(userID);
  await Session.deleteAllUserSessions(userID);
  await User.deleteUser(userID);
};
