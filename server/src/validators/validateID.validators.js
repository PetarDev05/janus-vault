import { Types } from "mongoose";

export const validateID = (id) => {
  if (!id || !Types.ObjectId.isValid(id)) {
    throw new Error();
  }
};
