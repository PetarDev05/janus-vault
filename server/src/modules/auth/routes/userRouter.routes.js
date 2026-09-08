import { Router } from "express";
import { registerUser } from "../controllers/registerUser.controllers.js";
import { signInUser } from "../controllers/signInUser.controllers.js";
import { signOutUser } from "../controllers/signOutUser.controllers.js";
import { deleteUserAccount } from "../controllers/deleteUserAccount.controllers.js";
import { refreshUserSession } from "../controllers/refreshUserSession.controllers.js";

export const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/sign_in").post(signInUser);
userRouter.route("/sign_out").patch(signOutUser);
userRouter.route("/delete").delete(deleteUserAccount);
userRouter.route("/refresh").post(refreshUserSession);
