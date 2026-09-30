import { decryptSecretFields } from "./decryptSecretFields.services.js";

export const decryptAllSecrets = (secrets) => {
  for (let i = 0; i < secrets.length; i++) {
    const fields = secrets[i].fields;
    secrets[i].fields = decryptSecretFields(fields);
  }

  return secrets;
};
