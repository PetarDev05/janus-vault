import bcrypt from "bcrypt";

export const compareHashes = async (string, hashedString) => {
  return await bcrypt.compare(string, hashedString);
};
