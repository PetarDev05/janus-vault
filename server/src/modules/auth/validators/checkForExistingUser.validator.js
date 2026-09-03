import User from "../models/user.models.js";

export const checkForExistingUser = async (username, email) => {
  await User.isUsernameInUse(username);
  await User.isEmailInUse(email);
};
