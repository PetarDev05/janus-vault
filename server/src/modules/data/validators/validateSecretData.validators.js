import APIError from "../../../utils/APIError.utils.js";

export const validateSecretData = (categoryName, name, fields) => {
  if (!categoryName) {
    throw new APIError(400, "INVALID_FORMAT", "Category not provided.", null);
  }

  if (!name) {
    throw new APIError(400, "INVALID_FORMAT", "Name field is required.", null);
  }

  if (name.length < 2 || name.length > 100) {
    throw new APIError(
      400,
      "INVALID_FORMAT",
      "Name must be between 2 and 100 charaters long.",
      null,
    );
  }

  if (fields.length === 0) {
    throw new APIError(
      400,
      "INVALID_FORMAT",
      "At least one field must be provided.",
      null,
    );
  }

  if (fields.length > 10) {
    throw new APIError(
      400,
      "INVALID_FORMAT",
      "There can be maximum of 10 fields in one secret.",
      null,
    );
  }

  for (let i = 0; i < fields.length; i++) {
    if (!fields[i].key || !fields[i].value) {
      throw new APIError(
        400,
        "INVALID_FORMAT",
        "All key - value pairs must be filled.",
        null,
      );
    }
  }
};
