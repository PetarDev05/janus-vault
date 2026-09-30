import APIResponse from "../../../utils/APIResponse.utils.js";
import Category from "../models/category.models.js";
import Secret from "../models/secret.models.js";
import { decryptAllSecrets } from "../services/decryptAllSecrets.services.js";

export const fetchAllData = async (req, res, next) => {
  try {
    // extract data
    const userID = req.userID;

    // fetch data
    let secrets = await Secret.find({ userID });
    const categories = await Category.find({ userID });

    // decrypt secret fields
    secrets = decryptAllSecrets(secrets);

    // send response
    const response = new APIResponse(200, { secrets, categories }, "");
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
