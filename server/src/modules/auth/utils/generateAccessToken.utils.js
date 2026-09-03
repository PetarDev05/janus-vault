import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {
  const token = jwt.sign({ userID: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_ACS_EXP_TIME,
  });
  return token;
};
