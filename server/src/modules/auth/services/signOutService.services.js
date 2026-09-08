import { cryptoHashToken } from "../utils/cryptoHashToken.utils.js"
import Session from "../models/session.models.js";

export const signOutService = async (refreshToken) => {
  if (refreshToken) {
    const refreshTokenHash = cryptoHashToken(refreshToken);

    await Session.deleteUserSession(refreshTokenHash);
  }
}