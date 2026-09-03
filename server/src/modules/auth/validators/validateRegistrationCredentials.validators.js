import APIError from "../../../utils/APIError.utils.js";
import validator from "validator";

export const validateRegistrationCredentials = (username, email, password) => {
  if (!username || !email || !password) {
    throw new APIError(400, "INVALID_CREDENTIALS", "All fields are required.");
  }

  if (username.length < 2) {
    throw new APIError(
      400,
      "INVALID_CREDENTIALS",
      "Username can't be shorter than 2 characters.",
    );
  }

  if (username.length > 50) {
    throw new APIError(
      400,
      "INVALID_CREDENTIALS",
      "Username can't be longer than 50 characters.",
    );
  }

  if (!validator.isEmail(email)) {
    throw new APIError(400, "INVALID_CREDENTIALS", "Invalid email format.");
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 0,
      minSymbols: 0,
    })
  ) {
    throw new APIError(
      400,
      "INVALID_CREDENTIALS",
      "Password is not strong enough.",
    );
  }
};
