import crypto from "crypto";

export const generateRefreshToken = () => {
  const refreshTokenPlain = crypto.randomBytes(32).toString("hex");

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshTokenPlain)
    .digest("hex");

  return { refreshTokenPlain, refreshTokenHash };
};
