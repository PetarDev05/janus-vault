import { validateID } from "../../../validators/validateID.validators.js";
import Category from "../models/category.models.js";
import Secret from "../models/secret.models.js";
import { removeIndex } from "../utils/removeIndex.utils.js";
import { validateSecretData } from "../validators/validateSecretData.validators.js";
import { decryptSecretFields } from "./decryptSecretFields.services.js";
import { encryptSecretFields } from "./encryptSecretFields.services.js";

export const createSecretService = async (
  userID,
  categoryName,
  name,
  fields,
) => {
  fields = removeIndex(fields);
  console.log(fields);
  
  // validate provided data
  validateSecretData(categoryName, name, fields);

  // find category id by it's name and user id
  const categoryID = await Category.findCategoryIDByName(userID, categoryName);

  // validate category id
  validateID(categoryID);

  fields = encryptSecretFields(fields);

  // create new secret
  const newSecret = await Secret.createSecret(
    userID,
    categoryID,
    categoryName,
    name,
    fields,
  );

  newSecret.fields = decryptSecretFields(newSecret.fields);

  return newSecret;
};
