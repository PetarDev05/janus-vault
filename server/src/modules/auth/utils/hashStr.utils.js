import bcrypt from "bcrypt";

export const hashStr = async (str) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(str, salt);
  return hash;
};
