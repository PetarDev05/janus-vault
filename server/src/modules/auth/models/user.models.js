import { Schema, model } from "mongoose";
import APIError from "../../../utils/APIError.utils.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// Regsiter methods

userSchema.statics.isUsernameInUse = async function (username) {
  const existingUser = await this.findOne({ username });
  if (existingUser) {
    throw new APIError(
      409,
      "USER_ALREADY_EXISTS",
      "This username is already in use.",
    );
  }
};

userSchema.statics.isEmailInUse = async function (email) {
  const existingUser = await this.findOne({ email });
  if (existingUser) {
    throw new APIError(
      409,
      "USER_ALREADY_EXISTS",
      "This email is already in use.",
    );
  }
};

userSchema.statics.createNewUser = async function (
  username,
  email,
  hashedPassword,
) {
  const newUser = await this.create({
    username,
    email,
    password: hashedPassword,
  });

  return newUser;
};

// Sign-in methods

userSchema.statics.findUserByUsername = async function (username) {
  const existingUser = await this.findOne({ username });
  if (!existingUser) {
    throw new APIError(
      404,
      "USER_NOT_FOUND",
      "Account is not found. Check your sign in credentials.",
    );
  }
  return existingUser;
};

// Refresh methods

userSchema.statics.findUserById = async function (userID) {
  const user = await this.findOne({ _id: userID });

  if (!user) {
    throw new APIError(
      404,
      "USER_NOT_FOUND",
      "User not found. Please sign in again.",
    );
  }

  return user;
};

// Delete methods

userSchema.statics.deleteUser = async function (userID) {
  await this.findByIdAndDelete(userID);
};

export default model("User", userSchema);
