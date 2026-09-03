import { Router } from "express";
import { registerUser } from "../controllers/registerUser.controllers.js";
// import { signInUser } from "../controllers/signInUser.controllers.js";
// import { signOutUser } from "../controllers/signOutUser.controllers.js";
// import { deleteUser } from "../controllers/deleteUser.controllers.js";
// import { refreshUserSession } from "../controllers/refreshUserSession.controllers.js";

export const userRouter = Router();

userRouter.route("/register").post(registerUser);
// userRouter.route("/sign_in").post(signInUser);
// userRouter.route("/sign_out/:userId").patch(signOutUser);
// userRouter.route("/delete/:userId").delete(deleteUser);
// userRouter.route("/refresh").post(refreshUserSession);
