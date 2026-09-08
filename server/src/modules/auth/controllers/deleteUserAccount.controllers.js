import APIResponse from "../../../utils/APIResponse.utils.js";
import { deleteAccountService } from "../services/deleteAccountService.services.js";
import ms from "ms";

export const deleteUserAccount = async (req, res, next) => {
  try {
    // extract data from the cookie
    const refreshToken = req.cookies?.refreshToken;

    // delete user session if it exists
    await deleteAccountService(refreshToken);

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
      "Account deleted successfully.",
    );
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
