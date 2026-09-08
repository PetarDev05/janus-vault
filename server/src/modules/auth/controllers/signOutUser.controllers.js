import ms from "ms";
import APIResponse from "../../../utils/APIResponse.utils.js";
import { signOutService } from "../services/signOutService.services.js";

export const signOutUser = async (req, res, next) => {
  try {
    // extract data from the cookie
    const refreshToken = req.cookies?.refreshToken;

    // delete user session if it exists
    await signOutService(refreshToken);

    // clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: ms(process.env.COOKIE_EXP_TIME),
    });

    // send response to the client
    const response = new APIResponse(
      200,
      null,
      "You are signed out successfully.",
    );
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
