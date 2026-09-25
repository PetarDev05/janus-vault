import APIResponse from "../../../utils/APIResponse.utils.js";
import { validateID } from "../../../validators/validateID.validators.js";
import Secret from "../models/secret.models.js";

export const deleteSecret = async (req, res, next) => {
  try {
    // extract the data
    const userID = req.userID;
    const { secretID } = req.params;

    // validate secret id
    validateID(secretID);

    // delete secret
    await Secret.deleteSecret(userID, secretID);

    //send response
    const response = new APIResponse(
      200,
      { secretID },
      "Secret deleted successfully.",
    );

    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
