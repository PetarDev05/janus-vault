import crypto from "crypto";

export const cryptoHashToken = (plainToken) => {
  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(plainToken)
    .digest("hex");

  return refreshTokenHash;
};
