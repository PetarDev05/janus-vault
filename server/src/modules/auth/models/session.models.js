import { Schema, model, Types } from "mongoose";
import { setExpirationDate } from "../utils/setExpirationDate.utils.js";

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

sessionSchema.statics.createSession = async function (
  userID,
  refreshTokenHash,
) {
  const expDate = setExpirationDate();

  await this.create({
    userID,
    refreshToken: refreshTokenHash,
    expiresAt: expDate,
  });
};

export default model("Session", sessionSchema);
