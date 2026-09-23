import { validateID } from "../../../validators/validateID.validators.js";
import Category from "../models/category.models.js";
import Secret from "../models/secret.models.js";
import { validateSecretData } from "../validators/validateSecretData.validators.js";

export const createSecretService = async (
  userID,
  categoryName,
  name,
  fields,
) => {
  // validate provided data
  validateSecretData(categoryName, name, fields);

  // find category id by it's name and user id
  const categoryID = await Category.findCategoryIDByName(userID, categoryName);

  // validate category id
  validateID(categoryID);

  // create new secret
  const newSecret = await Secret.createSecret(
    userID,
    categoryID,
    categoryName,
    name,
    fields,
  );

  return newSecret;
};
