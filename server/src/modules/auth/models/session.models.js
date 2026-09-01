import { Schema, model, Types } from "mongoose";

const sessionSchema = new Schema(
  {
    userID: {
      type: Types.ObjectId,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export default model("Session", sessionSchema);
