import APIError from "../../../utils/APIError.utils.js";

export const checkRefreshToken = (refreshToken, flag) => {
  if (!refreshToken) {
    let message = "";

    if (flag === "refresh") {
      message = "Your session expired, please sign in again.";
    } else {
      message =
        "Unable to delete account due to session expiration. Please sign in again.";
    }

    throw new APIError(401, "TOKEN_EXPIRED", message, "SIGN_OUT");
  }
};
