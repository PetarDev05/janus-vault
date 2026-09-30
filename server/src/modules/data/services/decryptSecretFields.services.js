import { decrypt } from "../utils/encryption.utils.js";

export const decryptSecretFields = (secretFields) => {
  for (let i = 0; i < secretFields.length; i++) {
    const { value } = secretFields[i];
    secretFields[i].value = decrypt(value);
  }

  return secretFields;
};
