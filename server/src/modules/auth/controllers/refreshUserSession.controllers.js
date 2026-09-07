import APIResponse from "../../../utils/APIResponse.utils.js";
import ms from "ms";
import { refreshSessionService } from "../services/refreshSessionService.services.js";

export const refreshUserSession = async (req, res, next) => {
  try {
    // extract data from the cookie
    const refreshToken = req.cookies?.refreshToken;

    // find existing user and extend his session by providing new access token
    const { existingUser, accessToken } = await refreshSessionService(refreshToken);

    // Normalize user object
    const user = {
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      createdAt: existingUser.createdAt,
    };

    // send response to the client
    const response = new APIResponse(200, { user, accessToken }, "");
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: ms(process.env.COOKIE_EXP_TIME),
    });

    next(error);
  }
};
