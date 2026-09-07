import { Schema, model, Types } from "mongoose";
import { setExpirationDate } from "../utils/setExpirationDate.utils.js";
import APIError from "../../../utils/APIError.utils.js";

const sessionSchema = new Schema(
  {
    userID: {
      type: Types.ObjectId,
      ref: "User",
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

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

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

sessionSchema.statics.findSessionByToken = async function (refreshTokenHash) {
  const session = await this.findOne({ refreshToken: refreshTokenHash });

  if (!session) {
    throw new APIError(
      404,
      "SESSION_NOT_FOUND",
      "Your session expired, please sign in again.",
    );
  }

  if (session.expiresAt < new Date()) {
    await this.deleteOne({ _id: session._id });

    throw new APIError(
      401,
      "SESSION_EXPIRED",
      "Your session expired, please sign in again.",
    );
  }

  return session;
};

export default model("Session", sessionSchema);
