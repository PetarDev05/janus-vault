import { encrypt } from "../utils/encryption.utils.js";

export const encryptSecretFields = (secretFields) => {
  for (let i = 0; i < secretFields.length; i++) {
    const { value } = secretFields[i];
    secretFields[i].value = encrypt(value);
  }

  return secretFields;
};
