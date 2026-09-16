import APIError from "../../../utils/APIError.utils.js";

export const validateSignInCredentials = async (username, password) => {
  if (!username || !password) {
    throw new APIError(
      400,
      "INVALID_CREDENTIALS",
      "All fields are required.",
      null,
    );
  }
};
