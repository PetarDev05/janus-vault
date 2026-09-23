import APIResponse from "../../../utils/APIResponse.utils.js";
import { updateSecretService } from "../services/updateSecretService.services.js";

export const updateSecret = async (req, res, next) => {
  try {
    // extract data
    const userID = req.userID;
    const { categoryName, name, fields } = req.body;
    const { secretID } = req.params;

    // update provided secreet
    const updatedSecret = await updateSecretService(
      userID,
      categoryName,
      name,
      fields,
      secretID,
    );

    // send response
    const response = new APIResponse(
      200,
      { updatedSecret },
      "Secret updated successfully.",
    );

    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
