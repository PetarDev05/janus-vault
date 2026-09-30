import { SimpleCrypto } from "simple-crypto-js";

const crypto = new SimpleCrypto("a3376fe40cf66ec8d6c08680030eab25d10b6d00f8f869516df99170238d4e7f");

export const encrypt = (plainText) => {
  const encrypted = crypto.encrypt(plainText);
  return encrypted;
};

export const decrypt = (encryptedText) => {
  const decrypted = crypto.decrypt(encryptedText);
  return decrypted;
};
