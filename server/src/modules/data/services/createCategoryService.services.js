import Category from "../models/category.models.js";
import { validateCategoryName } from "../validators/validateCategoryName.validators.js";

export const createCategoryService = async (userID, categoryName) => {
  // validate category name format
  validateCategoryName(categoryName);

  // create new category
  const newCategory = await Category.createNewCategory(userID, categoryName);

  // return the result 
  return newCategory;
};
