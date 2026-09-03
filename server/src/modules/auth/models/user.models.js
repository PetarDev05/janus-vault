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

export default model("User", userSchema);
