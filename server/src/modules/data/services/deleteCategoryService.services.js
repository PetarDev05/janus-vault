import APIError from "../../../utils/APIError.utils.js";
import { validateID } from "../../../validators/validateID.validators.js";
import Category from "../models/category.models.js";
import Secret from "../models/secret.models.js";

export const deleteCategoryService = async (categoryID) => {
  // validate given category id
  validateID(categoryID);

  // check if category exists
  const secrets = await Secret.find({ categoryID });

  if (secrets.length > 0) {
    throw new APIError(
      409,
      "CONFLICT",
      "Category contains secrets, it can't be removed.",
    );
  }

  await Category.deleteCategory(categoryID);
};
