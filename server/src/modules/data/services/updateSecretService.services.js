import Category from "../models/category.models.js";
import Secret from "../models/secret.models.js";
import { validateSecretData } from "../validators/validateSecretData.validators.js";

export const updateSecretService = async (
  userID,
  categoryName,
  name,
  fields,
  secretID,
) => {
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

  oldSecret.fields = fields;

  await oldSecret.save();

  return oldSecret
};
