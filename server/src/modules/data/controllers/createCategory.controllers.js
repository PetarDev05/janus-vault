import APIResponse from "../../../utils/APIResponse.utils.js";
import { createCategoryService } from "../services/createCategoryService.services.js";

export const createCategory = async (req, res, next) => {
  try {
    // extract data
    const userID = req.userID;
    const { categoryName } = req.body;

    // create new category
    const newCategory = await createCategoryService(userID, categoryName);

    //send response
    const response = new APIResponse(
      200,
      { newCategory },
      "New category created successfully.",
    );

    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
