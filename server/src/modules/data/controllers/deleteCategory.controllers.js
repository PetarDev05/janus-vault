import APIResponse from "../../../utils/APIResponse.utils.js";
import { deleteCategoryService } from "../services/deleteCategoryService.services.js";

export const deleteCategory = async (req, res, next) => {
  try {
    // extract data
    const { categoryID } = req.params;

    // delete category
    await deleteCategoryService(categoryID);

    //send response
    const response = new APIResponse(
      200,
      null,
      "Category deleted successfully.",
    );

    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
