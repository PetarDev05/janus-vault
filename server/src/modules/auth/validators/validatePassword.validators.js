import APIError from "../../../utils/APIError.utils.js";
import { compareHashes } from "../utils/compareHashes.utils.js";

export const validatePassword = async (passwordPlain, passwordHash) => {
  const match = await compareHashes(passwordPlain, passwordHash);

  if (!match) {
    throw new APIError(401, "INVALID_CREDENTIALS", "Password is incorrect");
  }
};
