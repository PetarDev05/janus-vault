import APIError from "../../../utils/APIError.utils.js";

export const checkRefreshToken = (refreshToken) => {
  if (!refreshToken) {
    throw new APIError(
      401,
      "TOKEN_EXPIRED",
      "Your session expired, please sign in again.",
    );
  }
};
