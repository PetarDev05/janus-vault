import Category from "../models/category.models.js";
import Secret from "../models/secret.models.js";
import { removeIndex } from "../utils/removeIndex.utils.js";
import { validateSecretData } from "../validators/validateSecretData.validators.js";
import { decryptSecretFields } from "./decryptSecretFields.services.js";
import { encryptSecretFields } from "./encryptSecretFields.services.js";

export const updateSecretService = async (
  userID,
  categoryName,
  name,
  fields,
  secretID,
) => {
  fields = removeIndex(fields);

  // validate provided data
  validateSecretData(categoryName, name, fields);

  // fetch secret that needs to be updated
  const oldSecret = await Secret.findSecretByID(userID, secretID);

  if (categoryName !== oldSecret.categoryName) {
    const newCategoryID = await Category.findCategoryIDByName(
      userID,
      categoryName,
    );
    oldSecret.categoryName = categoryName;
    oldSecret.categoryID = newCategoryID;
  }

  if (name !== oldSecret.name) {
    oldSecret.name = name;
  }

  fields = encryptSecretFields(fields);

  oldSecret.fields = fields;

  await oldSecret.save();

  oldSecret.fields = decryptSecretFields(fields);

  return oldSecret;
};
