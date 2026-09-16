import { getAccessToken } from "../storage/accessTokenStorage.storage.js";

export const createOptions = async (
  method = "GET",
  body,
  needAuth,
  needCredentials,
) => {
  let options = {
    method,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (needAuth) {
    const accessToken = getAccessToken();
    options.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (needCredentials) {
    options.credentials = "include";
  }
};
