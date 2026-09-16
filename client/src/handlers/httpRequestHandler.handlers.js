import { createOptions } from "../utils/createOptions.utils.js";
import { createURL } from "../utils/createURL.utils.js";
import { sendRequest } from "../utils/sendRequest.utils.js";

export const httpRequestHandler = async (
  type,
  service,
  params,
  method,
  body,
  needAuth,
  needCredentials,
) => {
  const url = createURL(type, service, params);
  const options = createOptions(method, body, needAuth, needCredentials);
  const parsedResponse = await sendRequest(url, options);
  return parsedResponse;
};
