import APIResponse from "../../../utils/APIResponse.utils.js";
import { createSecretService } from "../services/createSecretService.services.js";

export const createNewSecret = async (req, res, next) => {
  try {
    // extract data
    const userID = req.userID;
    const { categoryName, name, fields } = req.body;

    // create secret
    const newSecret = await createSecretService(
      userID,
      categoryName,
      name,
      fields,
    );

    // NE ZABORAVI DA KRIPTUJES PODATKE UNUTAR FIELDS NIZA

    // send response
    const response = new APIResponse(
      200,
      { newSecret },
      "New secret created successfully.",
    );

    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
