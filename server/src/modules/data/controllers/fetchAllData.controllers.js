import APIResponse from "../../../utils/APIResponse.utils.js";
import Category from "../models/category.models.js";
import Secret from "../models/secret.models.js";

export const fetchAllData = async (req, res, next) => {
  try {
    // extract data
    const userID = req.userID;

    // fetch data
    const secrets = await Secret.find({ userID });
    const categories = await Category.find({ userID });

    // send response
    const response = new APIResponse(200, { secrets, categories }, "");
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
