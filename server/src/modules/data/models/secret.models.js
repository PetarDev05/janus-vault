import { Schema, Types, model } from "mongoose";
import APIError from "../../../utils/APIError.utils.js";

const secretSchema = new Schema(
  {
    userID: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryID: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    fields: [
      {
        key: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

secretSchema.statics.createSecret = async function (
  userID,
  categoryID,
  categoryName,
  name,
  fields,
) {
  const newSecret = await this.create({ userID, categoryID, categoryName, name, fields });
  return newSecret;
};

secretSchema.statics.deleteSecret = async function (userID, secretID) {
  await this.deleteOne({ userID, _id: secretID });
};

secretSchema.statics.findSecretByID = async function (userID, secretID) {
  const secret = await this.findOne({ userID, _id: secretID });

  if (!secret) {
    throw new APIError(404, "NOT_FOUND", "Secret not found.");
  }

  return secret;
};

export default model("Secret", secretSchema);
