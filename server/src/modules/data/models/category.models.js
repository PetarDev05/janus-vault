import { Schema, Types, model } from "mongoose";
import APIError from "../../../utils/APIError.utils.js";

const categorySchema = new Schema(
  {
    userID: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

categorySchema.statics.createNewCategory = async function (userID, name) {
  const category = await this.findOne({ userID, name });

  if (category) {
    throw new APIError(
      409,
      "CONFLICT",
      "Category with this name already exists.",
      null,
    );
  }

  const newCategory = await this.create({ userID, name });
  return newCategory;
};

categorySchema.statics.deleteCategory = async function (categoryID) {
  const category = await this.findByIdAndDelete(categoryID, { new: true });

  if (!category) {
    throw new APIError(404, "NOT_FOUND", "Category is not found.", null);
  }
};

categorySchema.statics.findCategoryIDByName = async function (
  userID,
  categoryName,
) {
  const category = await this.findOne({ userID, name: categoryName });

  if (!category) {
    throw new APIError(404, "NOT_FOUND", "Category not found", null);
  }

  return category._id;
};

export default model("Category", categorySchema);
