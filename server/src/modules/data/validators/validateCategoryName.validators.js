import APIError from "../../../utils/APIError.utils.js";

export const validateCategoryName = (categoryName) => {
  if (!categoryName || categoryName.length < 2 || categoryName.length > 100) {
    throw new APIError(
      400,
      "INVALID_FORMAT",
      "Category name must be between 2 and 100 characters long.",
      null,
    );
  }
};
